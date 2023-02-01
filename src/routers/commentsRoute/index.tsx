import {
  ActionIcon,
  Alert,
  Avatar,
  createStyles,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Skeleton,
  Title,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/apis/comment";
import { commentTypes } from "../../utils/constants";
import { motion } from "framer-motion";
import {
  IconHourglassEmpty,
  IconNetworkOff,
  IconPlus,
  IconRefresh,
} from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

function Comment(props: {
  author: string;
  content: string;
  type: string;
  left: boolean;
  delay: number;
}) {
  let color = commentTypes[props.type as keyof typeof commentTypes].color;
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.25 * props.delay }}
    >
      <Flex
        w={"95%"}
        m={"10px auto"}
        justify={"space-around"}
        style={{ direction: props.left ? "rtl" : "ltr" }}
        align="center"
      >
        <Avatar radius="xl" src={null} alt={props.author} color={color}>
          {props.author.slice(0, 1)}
        </Avatar>
        <Alert variant="outline" title={props.author} w={"90%"} color={color}>
          {props.content}
        </Alert>
      </Flex>
    </motion.div>
  );
}

type CommentInfo = {
  id: string;
  user: string;
  content: string;
  type: string;
  isAnonymous: boolean;
  delay: number;
};

export function CommentShow() {
  let comments: Array<CommentInfo>;
  let setComments: Function;
  [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [netError, setNetError] = useState(false);
  const pageSize = 5;
  const getComment = function () {
    setLoading(true);
    getComments({ pageSize, pageNumber })
      .then((res) => {
        let newComments: Array<CommentInfo> = res.data.data.commentPage;
        if (newComments.length < pageSize) setEnd(true);
        if (newComments.length) {
          setComments([
            ...comments,
            ...newComments.map((v, i) => {
              return {
                ...v,
                user: v.isAnonymous ? "匿名" : v.user,
                delay: i,
              };
            }),
          ]);
        }
        setPageNumber(pageNumber + 1);
      })
      .catch(() => {
        setNetError(true);
        showNotification({
          title: "网络错误",
          color: "red",
          message: "请检查~~",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reGetComment = function () {
    setPageNumber(1);
    setEnd(false);
    setNetError(false);
    setComments([]);
    getComment();
  };

  useEffect(() => {
    reGetComment();
  }, []);

  return (
    <>
      <ScrollArea style={{ position: "relative" }}>
        <ActionIcon
          loading={loading}
          disabled={end}
          color="indigo"
          size="xl"
          radius="xl"
          variant="filled"
          style={{
            position: "fixed",
            right: 60,
            bottom: 60,
            zIndex: 10,
            opacity: 0.6,
          }}
        >
          {netError ? (
            <IconNetworkOff
              onClick={() => {
                reGetComment();
              }}
              size={32}
            ></IconNetworkOff>
          ) : end ? (
            <IconHourglassEmpty size={32}></IconHourglassEmpty>
          ) : (
            <IconPlus
              onClick={() => {
                getComment();
              }}
              size={32}
            ></IconPlus>
          )}
        </ActionIcon>
        {comments.map((v, i) => {
          return (
            <Comment
              key={v.id}
              left={i % 2 === 0}
              author={v.user}
              type={v.type}
              content={v.content}
              delay={v.delay}
            ></Comment>
          );
        })}
      </ScrollArea>
    </>
  );
}
