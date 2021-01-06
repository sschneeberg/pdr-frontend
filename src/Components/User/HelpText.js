const userDashHelp = (
    <p>
        Here are all of the bugs you have submitted. Click on the <strong>title</strong> of each bug to get the <strong>details </strong>of that ticket and have the ability to <strong>comment</strong> for the development team to see and reply to you. You can also chat with representatives via the <strong>chat bubble</strong> at the <strong><em>bottom right</em></strong> of the page. 
    </p>
)

const adminDashHelp = (
    <p>
        Here is your company dashboard, you can use the form to assign a developer to a ticket and set the priority of a ticket.
    </p>
)

const devDashHelp = (
    <p>
        Drag and drop boxes from one column to the next to <strong>change the status</strong> of the ticket. The user who submitted the bug and your admin will be notified for every move. <strong>Assigned Bugs</strong> are the new tickets that have just been assigned to you. <strong>In Review</strong> are tickets that you are currently woking on. <strong>Complete</strong> are tickets that you have completed and wish to mark as closed.
    </p>
)

const companySignupHelp = (
    <p>
        Here is where your <strong>development team</strong> or any other <strong>admins</strong> you'd like to sign up go. As a person signing up under an existing company, they will need to get the <strong>company key from the admin</strong> in order to complete registration under that exact company.
    </p>
)

const signupCompanyHelp = (
    <p>
         If you wish to use our platform for your company, <strong>thank you!</strong> This is where you will need to input your <strong>company's name</strong> and its <strong>products</strong>, along with signing yourself up. You will automatically be registered as an <strong>admin</strong> and upon login, you can find your <em>company key</em> to share with your employees under the <strong>company information</strong> on your dashboard. Happy bug hunting! 
    </p>
)

export {userDashHelp, adminDashHelp, devDashHelp, companySignupHelp, signupCompanyHelp}