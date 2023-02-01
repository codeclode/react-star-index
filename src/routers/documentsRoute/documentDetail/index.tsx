import { Affix, Badge, Box, Button, Title } from "@mantine/core";
import { createStyles, Header, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconArrowBack, IconSearch, IconTimelineEvent } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EmptyStatus } from "../../../components/utils/emptyStatus";
import { getDocumentContent } from "../../../utils/apis/documents";
import { Document } from "../../../utils/constants";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: "sticky",
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    cursor: "pointer",
    backgroundColor: "#66ccff00",
    borderRadius: "50%",
    padding: "5px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#66ccffff",
    },
  },

  content: {
    "& ul": {
      marginInlineStart: "10px",
    },
    "& pre": {
      backgroundColor: "#000000ad",
      padding: "10px",
      margin: "5px",
      border: "1px dotted snow",
      borderRadius: "10px",
      overflow: "auto",
      fontSize: "1.2em",
      lineHeight: "1.3",
    },
  },
}));

function DocumentHeader(prop: {
  title: string | undefined;
  updateTime: Date | undefined;
  tags: Array<string> | undefined;
}) {
  function back() {
    navigate("/documents");
  }

  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={12}>
      <div className={classes.inner}>
        <Group className={classes.backButton}>
          <IconArrowBack color="white" onClick={back} />
        </Group>
        <Group>
          <Title order={1} color="#efefef">
            {prop.title}
          </Title>
        </Group>
        <Group>
          <IconTimelineEvent color="#cdcdcd" />
          <Title order={6} color="#cdcdcd">
            {prop.updateTime
              ? "修改于" + prop.updateTime.toLocaleString()
              : null}
          </Title>
        </Group>
      </div>
    </Header>
  );
}

export function DocumentDetail() {
  let params = useParams();
  let location = useLocation();
  let [content, setContent] = useState("");
  const { classes } = useStyles();

  const document: {
    title: string | undefined;
    updateTime: Date | undefined;
    tags: Array<string> | undefined;
  } = {
    title: params.documentId,
    updateTime: location.state.updateTime,
    tags: location.state.tags,
  };

  function getContent() {
    getDocumentContent(document.title || "")
      .then((res) => {
        setContent(res.data.data.getPostContent);
      })
      .catch((err) => {
        showNotification({
          title: "网络错误",
          color: "red",
          message: "请检查您的操作",
        });
      });
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Box
      h={"100%"}
      style={{
        overflow: "auto",
      }}
    >
      <DocumentHeader {...document} />
      <Box ml={12} mb={12}>
        {document.tags
          ? document.tags.map((v, i) => {
              return (
                <Badge size="xl" mr={12} variant="outline" key={i}>
                  {v}
                </Badge>
              );
            })
          : null}
      </Box>
      <Box
        m={36}
        p={36}
        style={{
          color: "#cdcdcd",
          border: "1px dotted black",
          borderRadius: "12px",
        }}
      >
        {content === "" ? (
          <EmptyStatus></EmptyStatus>
        ) : (
          <Box
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: content }}
          ></Box>
        )}
      </Box>
    </Box>
  );
}
