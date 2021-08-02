using System.Collections.Generic;
using System.Linq;
using ProjectPortfolioManagement.Models;

namespace ProjectPortfolioManagement.DataAccess
{
    public class DataAccessProvider: IDataAccessProvider
    {
        private readonly PostgreSqlContext _context;

        public DataAccessProvider(PostgreSqlContext context)
        {
            _context = context;
        }

        public void AddProjectRequestRecord(ProjectRequest project_request)
        {
            _context.project_requests.Add(project_request);
            _context.SaveChanges();
        }

        public void UpdateProjectRequestRecord(ProjectRequest project_request)
        {
            _context.project_requests.Update(project_request);
            _context.SaveChanges();
        }

        public void DeleteProjectRequestRecord(string id)
        {
            var entity = _context.project_requests.FirstOrDefault(t => t.Id == id);
            _context.project_requests.Remove(entity);
            _context.SaveChanges();
        }

        public ProjectRequest GetProjectRequestSingleRecord(string id)
        {
            return _context.project_requests.FirstOrDefault(t => t.Id == id);
        }

        public List<ProjectRequest> GetProjectRequestRecords()
        {
            return _context.project_requests.ToList();
        }

        public bool CheckRequestorExistence(string id)
        {
            return _context.requestors.Any(t => t.Id == id);
        }

        public List<Requestor> GetRequestorRecords()
        {
            return _context.requestors.ToList();
        }
    }
}
