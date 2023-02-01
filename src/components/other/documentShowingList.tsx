import { Box, Center, Pagination } from "@mantine/core";
import { Document } from "../../utils/constants";
import { DocumentCard } from "./documentCard";

export function DocumentShowingList(props: {
  documents: Array<Document>;
  currentDocumentCount?: number;
  currentPage?: number;
  pageSize?: number;
  getNewDocuments?: Function;
  needPagination: boolean;
  navUrl: string;
  updatePostage: string;
}) {
  return (
    <Box p={30}>
      {props.documents.map((v, i) => {
        return (
          <DocumentCard
            {...v}
            rank={i}
            navUrl={props.navUrl}
            key={v.updateTime + v.title + props.updatePostage}
          ></DocumentCard>
        );
      })}
      {props.needPagination !== undefined &&
      props.currentDocumentCount !== undefined &&
      props.pageSize !== undefined ? (
        <Center>
          <Pagination
            page={props.currentPage}
            onChange={(page) => {
              if (props.getNewDocuments) props.getNewDocuments(page);
            }}
            mb={"10px"}
            total={Math.ceil(props.currentDocumentCount / props.pageSize)}
            siblings={3}
            boundaries={2}
            size="lg"
            withEdges
          />
        </Center>
      ) : null}
    </Box>
  );
}
