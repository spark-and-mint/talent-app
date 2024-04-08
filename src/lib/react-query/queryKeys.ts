export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_MEMBER_ACCOUNT = "createMemberAccount",

  // MEMBER KEYS
  GET_CURRENT_MEMBER = "getCurrentMember",
  GET_MEMBERS = "getMembers",
  GET_MEMBER_BY_ID = "getMemberById",

  // CLIENT KEYS
  GET_CLIENTS = "getClients",
  GET_CLIENT_BY_ID = "getClientById",

  // UPDATE KEYS
  GET_UPDATES_BY_PROJET_ID = "getUpdatesByProjectId",
  GET_UPDATE_BY_ID = "getUpdateById",
  GET_MEMBER_UPDATES = "getMemberUpdates",

  // OPPORTUNITY KEYS
  GET_MEMBER_OPPORTUNITY = "getMemberOpportunity",

  // PROJETS KEYS
  GET_MEMBER_PROJETS = "getMemberProjects",

  // OTHER KEYS
  GET_TYPEFORM_ANSWERS_BY_EMAIL = "getTypeformAnswersByEmail",
}
