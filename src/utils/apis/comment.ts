import axios from "axios";

const query = `query($pageSize:Int!,$pageNumber:Int!){
  commentPage(commentPageLimit: {pageSize: $pageSize, pageNumber: $pageNumber}) {
    id
    user
    content
    type
    isAnonymous
  }
}
`;

function createMutation(type: string) {
  return `mutation($user:String,$content:String!,$isAnonymous:Boolean!,$publishTime:Date){
    createComment(
      createCommentInput: {user: $user, content: $content, type: ${type}, isAnonymous: $isAnonymous, publishTime: $publishTime}
    ){
      id
    }
  }
  `;
}

export function getComments(pageLimit: {
  pageSize: number;
  pageNumber: number;
}) {
  return axios.post(import.meta.env.VITE_APP_BASE_URL, {
    query,
    variables: pageLimit,
  });
}

export type CreateCommentInput = {
  user: string | null;
  content: string;
  isAnonymous: boolean;
  type: string;
  publishTime: Date | null;
};

export function addComment(createCommentInput: CreateCommentInput) {
  let ql = createMutation(createCommentInput.type);
  return axios.post(import.meta.env.VITE_APP_BASE_URL, {
    query: ql,
    variables: createCommentInput,
  });
}
