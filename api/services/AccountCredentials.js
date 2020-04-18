const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main(user, plainPassword) {

    const msg = {
        to: user.email,
        from: 'mkinkela123@gmail.com',
        subject: 'Account credentials',
        html:
            `Dear ${user.firstName} ${user.lastName}!<br />
            <br />
            This is a generated email. An administrator has created an account for you on <a href="https://deejayelly.github.io/patient-recovery-data-app-covid-19-frontend/">Coronavirus Hackaton</a>.<br />
            <br />
            Use this credentials for your login:<br />
            Email: ${user.email}<br />
            Password: ${plainPassword}<br />
            <br />
            Keep up the great work!<br />
            <br />
            Sincerely, yours The Royal Windings team.
            `,
    };
    await sgMail.send(msg);
}

exports.sendEmail = (user, plainPassword) => main(user, plainPassword).catch(e => console.error(e));