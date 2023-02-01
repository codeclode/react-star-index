import { ActionIcon, Box, Button, Center, Flex, Text } from "@mantine/core";
import {
  IconActivityHeartbeat,
  IconError404,
  IconMoodEmpty,
} from "@tabler/icons";

export function EmptyStatus(props: { size?: number }) {
  return (
    <Center w="100%">
      <Flex direction="column">
        <IconActivityHeartbeat
          color="white"
          size={props.size ? props.size : 288}
        ></IconActivityHeartbeat>
        <Button variant="outline">❌No Any Thing😥</Button>
      </Flex>
    </Center>
  );
}
