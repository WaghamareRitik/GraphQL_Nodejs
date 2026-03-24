import { gql } from "@apollo/client";

/* ---------------- TASKS ---------------- */

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

/* ---------------- PROJECTS ---------------- */

export const GET_PROJECTS = gql`
  query {
    projects(limit: 50, offset: 0) {
      id
      name
    }
  }
`;

/* ---------------- USERS (UPDATED WITH SEARCH) ---------------- */

export const GET_USERS = gql`
  query GetUsers($limit: Int!, $offset: Int!, $search: String) {
    users(limit: $limit, offset: $offset, search: $search) {
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
/* ---------------- CURRENT USER ---------------- */

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
