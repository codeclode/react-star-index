import axios from "axios";
import { Document, documentPostTypes, documentTypes } from "../constants";

function createPageQuery(
  postType: "chat" | "data_Visualization" | null = null
) {
  let query = `query($pageSize:Int!, $pageNumber: Int!, $searchKeyWord:String!, $sortType:Int!) {
    getPostInfoPage(
      postPageLimit: {pageSize: $pageSize, pageNumber: $pageNumber, searchKeyWord: $searchKeyWord, sortType: $sortType, ${
        postType === null ? "" : "postType:" + postType
      }}
    ) {
      totalCount,
      pageContent{
        title:name
        updateTime
        tags
        avatar
        description
      }
    }
  }`;
  return query;
}

function createContentQuery() {
  return `query($fileName:String!){
  getPostContent(postFileName: {name: $fileName})
}
`;
}

type PostPageLimit = {
  postType: documentPostTypes;
  searchKeyWord: string;
  sortType: Number;
  pageNumber: Number;
  pageSize: Number;
};

export function getDocumentsInfo(postPageLimit: PostPageLimit) {
  let ql = createPageQuery(postPageLimit.postType);
  return axios.post(import.meta.env.VITE_APP_BASE_URL, {
    query: ql,
    variables: postPageLimit,
  });
}

export function getDocumentContent(fileName: string) {
  let ql = createContentQuery();
  return axios.post(import.meta.env.VITE_APP_BASE_URL, {
    query: ql,
    variables: { fileName: fileName },
  });
}
