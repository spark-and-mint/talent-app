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
  GET_UPDATES_BY_PROJECT_ID = "getUpdatesByProjectId",
  GET_UPDATE_BY_ID = "getUpdateById",
  GET_MEMBER_UPDATES = "getMemberUpdates",
  GET_UPDATE_FEEDBACK = "getUpdateFeedback",

  // OPPORTUNITY KEYS
  GET_MEMBER_OPPORTUNITIES = "getMemberOpportunities",

  // PROJECTS KEYS
  GET_PROJECT_TEAM = "getProjectTeam",
  GET_MEMBER_PROJECTS = "getMemberProjects",
  GET_PROJECT_BY_ID = "getProjectById",

  // MILESTONE KEYS
  GET_MILESTONE_BY_ID = "getMilestoneById",
  GET_PROJECT_MILESTONES = "getProjectMilestones",
  GET_MILESTONE_UPDATES = "getMilestoneUpdates",

  // OTHER KEYS
  GET_TYPEFORM_ANSWERS_BY_EMAIL = "getTypeformAnswersByEmail",
}
