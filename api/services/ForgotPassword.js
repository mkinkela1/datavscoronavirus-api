const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main(email, resetPasswordToken) {

    const msg = {
        to: email,
        from: 'mkinkela123@gmail.com',
        subject: 'Reset password',
        html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no">
  <!--[if !mso]>
      <!-->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300&subset=latin" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <style type="text/css">
    *{
      \t\t\tmargin:0;
      \t\t\tpadding:0;
      \t\t\tfont-family:'OpenSans-Light', "Helvetica Neue", "Helvetica",Calibri, Arial, sans-serif;
      \t\t\tfont-size:100%;
      \t\t\tline-height:1.6;
      \t\t}
      \t\tbody{
      \t\t\t-webkit-font-smoothing:antialiased;
      \t\t\t-webkit-text-size-adjust:none;
      \t\t\twidth:100%!important;
      \t\t\theight:100%;
      \t\t}
      \t\ta{
      \t\t\tcolor:#348eda;
      \t\t}
      \t\t.btn-primary{
      \t\t\ttext-decoration:none;
      \t\t\tcolor:#FFF;
      \t\t\tbackground-color:#a55bff;
      \t\t\tborder:solid #a55bff;
      \t\t\tborder-width:10px 20px;
      \t\t\tline-height:2;
      \t\t\tfont-weight:bold;
      \t\t\tmargin-right:10px;
      \t\t\ttext-align:center;
      \t\t\tcursor:pointer;
      \t\t\tdisplay:inline-block;
      \t\t}
      \t\t.last{
      \t\t\tmargin-bottom:0;
      \t\t}
      \t\t.first{
      \t\t\tmargin-top:0;
      \t\t}
      \t\t.padding{
      \t\t\tpadding:10px 0;
      \t\t}
      \t\ttable.body-wrap{
      \t\t\twidth:100%;
      \t\t\tpadding:0px;
      \t\t\tpadding-top:20px;
      \t\t\tmargin:0px;
      \t\t}
      \t\ttable.body-wrap .container{
      \t\t\tborder:1px solid #f0f0f0;
      \t\t}
      \t\ttable.footer-wrap{
      \t\t\twidth:100%;
      \t\t\tclear:both!important;
      \t\t}
      \t\t.footer-wrap .container p{
      \t\t\tfont-size:12px;
      \t\t\tcolor:#666;
      \t\t}
      \t\ttable.footer-wrap a{
      \t\t\tcolor:#999;
      \t\t}
      \t\t.footer-content{
      \t\t\tmargin:0px;
      \t\t\tpadding:0px;
      \t\t}
      \t\th1,h2,h3{
      \t\t\tcolor:#660099;
      \t\t\tfont-family:'OpenSans-Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
      \t\t\tline-height:1.2;
      \t\t\tmargin-bottom:15px;
      \t\t\tmargin:40px 0 10px;
      \t\t\tfont-weight:200;
      \t\t}
      \t\th1{
      \t\t\tfont-family:'Open Sans Light';
      \t\t\tfont-size:45px;
      \t\t}
      \t\th2{
      \t\t\tfont-size:28px;
      \t\t}
      \t\th3{
      \t\t\tfont-size:22px;
      \t\t}
      \t\tp,ul,ol{
      \t\t\tmargin-bottom:10px;
      \t\t\tfont-weight:normal;
      \t\t\tfont-size:14px;
      \t\t}
      \t\tul li,ol li{
      \t\t\tmargin-left:5px;
      \t\t\tlist-style-position:inside;
      \t\t}
      \t\t.container{
      \t\t\tdisplay:block!important;
      \t\t\tmax-width:600px!important;
      \t\t\tmargin:0 auto!important;
      \t\t\tclear:both!important;
      \t\t}
      \t\t.body-wrap .container{
      \t\t\tpadding:0px;
      \t\t}
      \t\t.content,.footer-wrapper{
      \t\t\tmax-width:600px;
      \t\t\tmargin:0 auto;
      \t\t\tpadding:20px 33px 20px 37px;
      \t\t\tdisplay:block;
      \t\t}
      \t\t.content table{
      \t\t\twidth:100%;
      \t\t}
      \t\t.content-message p{
      \t\t\tmargin:20px 0px 20px 0px;
      \t\t\tpadding:0px;
      \t\t\tfont-size:22px;
      \t\t\tline-height:38px;
      \t\t\tfont-family:'OpenSans-Light',Calibri, Arial, sans-serif;
      \t\t}
      \t\t.preheader{
      \t\t\tdisplay:none !important;
      \t\t\tvisibility:hidden;
      \t\t\topacity:0;
      \t\t\tcolor:transparent;
      \t\t\theight:0;
      \t\t\twidth:0;
      \t\t}
  </style>
</head>

<body bgcolor="#f6f6f6">
  <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    Make it a good one
</span>

  <!-- body -->
  <table class="body-wrap" width="600">
    <tr>
      <td class="container" bgcolor="#FFFFFF">
        <!-- content -->
        <table border="0" cellpadding="0" cellspacing="0" class="contentwrapper" width="600">
          <tr>
            <td>
              <div class="content">
                <table class="content-message">
                  <tr>
                    <td class="content-message" style="font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Calibri, Arial, sans-serif; color: #595959;">
                      <h1 style="font-family:'Open Sans', 'Helvetica Neue', 'Helvetica', Calibri, Arial, sans-serif;">
                                            Changing your password
                                        </h1>

                      <p style="font-family: 'Open Sans','Helvetica Neue', 'Helvetica',Calibri, Arial, sans-serif; font-size:18px; line-height:26px;">Need to reset your password? No problem. Just click below to get started.</p>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="325" height="60" bgcolor="#31cccc" style="text-align:center; display: block; margin: 0 auto;">
                            <a href="https://deejayelly.github.io/patient-recovery-data-app-covid-19-frontend/auth/reset-password/${resetPasswordToken}"
                              align="center" style="width: 325px!important; display:block; font-family:'Open Sans', 'Helvetica Neue', 'Helvetica', Calibri, Arial, sans-serif; font-size:20px; color:#ffffff; text-align: center; line-height:60px; text-decoration:none; margin: 0 auto;">Reset my password</a>
                          </td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </table>
                      <p style="font-family: 'Open Sans','Helvetica Neue', 'Helvetica',Calibri, Arial, sans-serif; font-size:18px; line-height:26px;">If you didn't request to change your password, you don't have to do anything. So that's easy.</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
        </table>
        <!-- /content -->
      </td>
      <td></td>
    </tr>
  </table>
  <!-- /body -->
</body>

</html>
        `,
    };
    await sgMail.send(msg);
}

exports.sendEmail = (email, resetPasswordToken) => main(email, resetPasswordToken).catch(e => console.error(e));