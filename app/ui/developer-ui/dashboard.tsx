import { fetchUserByEmail } from '@/app/lib/data/data';
import { auth } from '@/auth';
import { lusitana } from '../ui-utils/fonts';
import { fetchDeveloperGroupMembers, fetchProjectByGroup } from '@/app/lib/data/developer-data';
import ProjectDashboard from './project-dashboard-components/ProjectDashboard';

export default async function Dashboard() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const groupMembers = await fetchDeveloperGroupMembers(session!.user!.group!);
  const projectInfo = await fetchProjectByGroup(session!.user!.group!);

  const groupNumber = session!.user!.group!


  return (
    <main className="flex-grow flex flex-col bg-wvu-off-white sm:px-20 sm:py-18">
  <div className="flex flex-col md:flex-row ">
    {/* Left Column: First and Second Containers */}
    <div className="w-full md:w-1/3 p-2">
      {/* First Container */}
      <div className="mb-8">
        <div className="flex-grow ">
          <div className="flex items-center justify-between">
            <h6 className="text-4xl text-wvu-primary-blue font-bold">Project</h6>
          </div>
          <div className="pt-5 pl-5">
            <div className="overflow-hidden">
              {projectInfo && projectInfo.length > 0 ? (
                <>
                  <div className="flex items-center mb-4">
                    <span className="block underline text-blue-900 text-base font-bold mr-2">Name:</span>
                    <span>{projectInfo[0].name}</span>
                  </div>
                  <span className="block underline text-blue-900 text-base font-bold">Project Description: </span>
                  <span>{projectInfo[0].description}</span>
                </>
              ) : (
                <span>No project information available.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Second Container */}
      <div className="mb-8">
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h6 className="text-4xl text-wvu-primary-blue font-bold">Group Information</h6>
          </div>
          <div className="pt-5 pl-5">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left pr-20 pb-2 pl-10 underline text-blue-900 text-base font-bold">Name</th>
                  <th className="text-left pb-2 pl-10 underline text-blue-900 text-base font-bold">Email</th>
                </tr>
              </thead>
              <tbody>
                {groupMembers && groupMembers.length > 0 ? (
                  groupMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="pr-20 pb-2 pl-10 whitespace-normal break-words">{member.name}</td>
                      <td className="pb-2 pl-10 whitespace-normal break-words">{member.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>No group members found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Third Container */}
    <div className="w-full md:w-2/3 p-2">
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h6 className="text-4xl text-wvu-primary-blue font-bold">Project Dashboard</h6>
        </div>
        <div className="p-5">
          <p>
            Build the dashboard here for your RANIA device.
            Clicking "Save" will save the current formatted dashboard to your project.
            Download your dashboard layout for your handshake packethandshake packet.
          </p>
        </div>
        <div style={{ padding: 5, display: 'flex', justifyContent: 'center' }}>
          {projectInfo && projectInfo.length > 0 ? (
            <ProjectDashboard
              projectId={projectInfo[0].id}
              projectName={projectInfo[0].name}
              projectDescription={projectInfo[0].description}
            />
          ) : (
            <p>No project information available for the dashboard.</p>
          )}
        </div>
      </div>
    </div>
  </div>
</main>

  );
}
