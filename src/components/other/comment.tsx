import {
  Box,
  Button,
  createStyles,
  Flex,
  Modal,
  Select,
  Switch,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconMoon, IconSend, IconSun } from "@tabler/icons";
import { commentTypes } from "../../utils/constants";
import { addComment } from "../../utils/apis/comment";

const useStyles = createStyles({
  submitButton: {
    display: "block",
    margin: "0 auto",
    marginTop: "10px",
  },
});

const commentComponent = (props: {
  setCommentingState: Function;
  commenting: boolean;
}) => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: "",
      commentContent: "",
      commentType: "info",
    },
    validate: {
      name: (v) => (anonymous || v.trim().length !== 0 ? null : "请输入昵称"),
      commentContent: (v) =>
        v.length <= 150 && v.length >= 10 ? null : "评论字数应在10到150中",
      commentType: (v) =>
        Object.keys(commentTypes).includes(v) ? null : "请按规定选择评论",
    },
  });
  var [anonymous, setAnonymous] = useState(false);
  var [sending, setSending] = useState(false);
  const { classes } = useStyles();
  function submit() {
    if (!form.validate().hasErrors) {
      setSending(true);
      addComment({
        content: form.values.commentContent,
        publishTime: new Date(),
        user: anonymous ? null : form.values.name,
        isAnonymous: anonymous,
        type: form.values.commentType,
      })
        .then(() => {
          showNotification({
            message: "发送成功",
            title: "谢谢你",
            autoClose: 1500,
            color: "green",
            icon: <IconSend />,
          });
          props.setCommentingState();
        })
        .catch((e) => {
          showNotification({
            message: "糟糕糟糕",
            title: "网络出错啦",
            autoClose: 1500,
            color: "red",
            icon: <IconAlertCircle />,
          });
        })
        .finally(() => {
          setSending(false);
        });
    } else {
      showNotification({
        message: "请完善信息",
        title: "出错啦",
        autoClose: 1500,
        color: "red",
        icon: <IconAlertCircle />,
      });
    }
  }
  return (
    <>
      <Modal
        title={
          <Box>
            <Title order={3} inline>
              评论
            </Title>
            <Switch
              checked={anonymous}
              onChange={(event) => setAnonymous(event.currentTarget.checked)}
              label="匿名评论"
              offLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
              }
              onLabel={
                <IconMoon size={16} stroke={2.5} color={theme.colors.gray[4]} />
              }
              color={"gray"}
              size="lg"
            />
          </Box>
        }
        overlayColor="#545454"
        centered
        opened={props.commenting}
        onClose={() => {
          props.setCommentingState();
        }}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            disabled={anonymous}
            withAsterisk
            label="昵称"
            placeholder="you name"
            {...form.getInputProps("name")}
          />
          <Textarea
            maxLength={150}
            minLength={10}
            {...form.getInputProps("commentContent")}
            placeholder="输入一条评论"
            label="你的评论"
            withAsterisk
          />
          <Select
            withAsterisk
            {...form.getInputProps("commentType")}
            label="类型"
            data={Object.keys(commentTypes).map((v) => {
              return {
                value: v,
                label: commentTypes[v as keyof typeof commentTypes].selection,
              };
            })}
          ></Select>
          <Button
            loading={sending}
            className={classes.submitButton}
            variant="light"
            color="violet"
            radius="md"
            size="md"
            onClick={submit}
          >
            提交
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default commentComponent;
