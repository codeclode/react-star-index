import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Input,
  Loader,
  LoadingOverlay,
  Pagination,
  Tabs,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconArrowsHorizontal,
  IconCaretDown,
  IconCaretUp,
  IconSearch,
  IconTelescope,
} from "@tabler/icons";
import { SyntheticEvent, useEffect, useState } from "react";
import { DocumentCard } from "../../components/other/documentCard";
import { DocumentShowingList } from "../../components/other/documentShowingList";
import { EmptyStatus } from "../../components/utils/emptyStatus";
import { getDocumentsInfo } from "../../utils/apis/documents";

import { NavigationProgress } from "@mantine/nprogress";

import {
  documentTypes,
  DocumentType,
  Document,
  documentPostTypes,
} from "../../utils/constants";

const pageSize = 5;
var currentType: documentPostTypes = documentTypes[0].value;
export function Documents() {
  var [timeSorter, setTimeSorter] = useState(0);
  var [loading, setLoading] = useState(false);
  var [currentDocumentCount, setCurrentDocumentCount] = useState(0);
  var [currentPage, setCurrentPage] = useState(1);
  var [keyWord, setKeyWord] = useState("");
  let [updatePostage, setUpdatePostage] = useState(new Date());
  let documentsInfo: Array<Document>;
  let setDocumentsInfo: Function;
  [documentsInfo, setDocumentsInfo] = useState([]);

  useEffect(() => refreshDocuments(currentType, 1), []);

  function refreshDocuments(type: documentPostTypes, page: number) {
    if (currentType !== type) {
      setCurrentPage(1);
      currentType = type;
      getDocuments();
    } else {
      setCurrentPage(page);
      getDocuments(page);
      return;
    }
  }
  function getDocuments(page: number = 1) {
    setLoading(true);
    getDocumentsInfo({
      pageNumber: page,
      pageSize: pageSize,
      searchKeyWord: keyWord,
      sortType: timeSorter,
      postType: currentType,
    })
      .then((res) => {
        let data = res.data.data.getPostInfoPage;
        setUpdatePostage(new Date());
        setCurrentDocumentCount(data.totalCount);
        setDocumentsInfo(
          data.pageContent.map((v: any) => {
            return {
              ...v,
              updateTime: new Date(v.updateTime),
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "糟糕糟糕",
          color: "red",
          message: "网络失灵啦",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Tabs
        onTabChange={(value) => {
          let v =
            documentTypes.find((v) => {
              return v.name === value;
            })?.value || null;
          refreshDocuments(v, 1);
        }}
        defaultValue={documentTypes[0].name}
      >
        <Tabs.List grow>
          {documentTypes.map((v) => {
            return (
              <Tabs.Tab key={v.value} value={v.name} icon={<v.icon />}>
                {v.name}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
        <Grid mt={10} w={"100%"} columns={12} justify="center" align="center">
          <Grid.Col span={2}>
            <Center>
              <Button
                variant="outline"
                color="pink"
                leftIcon={
                  timeSorter === 0 ? (
                    <IconArrowsHorizontal />
                  ) : timeSorter === 1 ? (
                    <IconCaretUp />
                  ) : (
                    <IconCaretDown />
                  )
                }
                onClick={() => {
                  if (timeSorter === 0) setTimeSorter(1);
                  else if (timeSorter === 1) setTimeSorter(-1);
                  else setTimeSorter(0);
                }}
              >
                按时间筛选
              </Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={8}>
            <Input
              icon={<IconTelescope></IconTelescope>}
              placeholder="输入关键词"
              onInput={(e: any) => {
                setKeyWord(e.target.value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Center>
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                leftIcon={<IconSearch />}
                onClick={() => {
                  refreshDocuments(currentType, 1);
                }}
              >
                检索
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
        {loading ? (
          <Center>
            <Loader variant="bars" size={144} mt={40} />
          </Center>
        ) : documentsInfo.length === 0 ? (
          <EmptyStatus></EmptyStatus>
        ) : (
          <DocumentShowingList
            updatePostage={updatePostage.toString()}
            documents={documentsInfo}
            currentDocumentCount={currentDocumentCount}
            currentPage={currentPage}
            pageSize={pageSize}
            needPagination={true}
            navUrl={"documentDetail"}
            getNewDocuments={(page: number) => {
              refreshDocuments(currentType, page);
            }}
          />
        )}
      </Tabs>
    </>
  );
}
