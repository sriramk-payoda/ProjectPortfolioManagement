using ProjectPortfolioManagement.Models;
using System.Collections.Generic;

namespace ProjectPortfolioManagement.DataAccess
{
    public interface IDataAccessProvider
    {
        void AddProjectRequestRecord(ProjectRequest patient);
        void UpdateProjectRequestRecord(ProjectRequest patient);
        void DeleteProjectRequestRecord(string id);
        ProjectRequest GetProjectRequestSingleRecord(string id);
        List<ProjectRequest> GetProjectRequestRecords();
        bool CheckRequestorExistence(string id);
        List<Requestor> GetRequestorRecords();
    }
}
