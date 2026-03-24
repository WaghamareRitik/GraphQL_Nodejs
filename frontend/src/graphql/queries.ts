import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    tasks(limit: 50, offset: 0) {
      id
      title
      status
      project {
        id
        name
      }
      assignedTo {
        id
        name
        email
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    projects(limit: 50, offset: 0) {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  query {
    users(limit: 50, offset: 0) {
      id
      name
      email
      role
      projects {
        id
      }
      assignedTask {
        id
      }
    }
  }
`;
export const GET_ME = gql`
  query {
    me {
      id
      name
      email
      role
    }
  }
`;
