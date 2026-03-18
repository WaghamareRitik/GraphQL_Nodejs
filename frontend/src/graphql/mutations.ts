import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation ($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;

export const UPDATE_TASK = gql`
  mutation ($taskId: ID!, $status: String!) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      id
      status
    }
  }
`;

export const CREATE_TASK = gql`
  mutation (
    $title: String!
    $description: String
    $projectId: ID!
    $assignedTo: ID
  ) {
    createTask(
      title: $title
      description: $description
      projectId: $projectId
      assignedTo: $assignedTo
    ) {
      id
      title
      status
    }
  }
`;
