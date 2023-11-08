import Endpoints from "../../constants/api-endpoint";
import http from "../../apiManager/http-request-handler";
import { WorkIssue } from "../../models/Issue";
import { MasterBase } from "../../models/type";

class IssueService {
  async getAll(workId: string) {
    const query = `${Endpoints.WorkIssues.ISSUES.replace(
      ":work_id",
      workId.toString()
    )}`;
    return await http.GetRequest<WorkIssue[]>(query);
  }

  async create(workId: string, data: MasterBase) {
    const query = `${Endpoints.WorkIssues.ISSUES.replace(
      ":work_id",
      workId.toString()
    )}`;
    // TODO: uncomment this line
    // return await http.PostRequest(query, JSON.stringify(data));
    return Promise.resolve();
  }

  async approve(work_id: string, issue_id: string) {
    let query = `${Endpoints.WorkIssues.APPROVE_ISSUE.replace(
      ":work_id",
      work_id.toString()
    )}`;
    query = query.replace(":issue_id", issue_id.toString());
    // TODO: uncomment this line
    // return await http.PutRequest(query);
    return Promise.resolve();
  }
}

export default new IssueService();
