export const activateTemplateEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .es-content-body {
            background-color: #ffffff;
            background-image: url('https://fidnzci.stripocdn.email/content/guids/CABINET_0e8fbb6adcc56c06fbd3358455fdeb41/images/vector_0Ia.png');
            background-repeat: no-repeat;
            background-position: center center;
            width: 600px;
            margin: 0 auto;
        }
        .esd-structure {
            padding-top: 20px;
            padding-bottom: 10px;
            padding-right: 20px;
            padding-left: 20px;
        }
        .esd-container-frame {
            width: 100%;
            text-align: center;
        }
        .esd-block-image img {
            display: block;
        }
        .esd-block-text {
            text-align: center;
        }
        .esd-block-button .es-button {
            font-weight: normal;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        .es-button-border {
            display: inline-block;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <td class="esd-stripe" align="center">
        <table class="es-content-body" background="https://fidnzci.stripocdn.email/content/guids/CABINET_0e8fbb6adcc56c06fbd3358455fdeb41/images/vector_0Ia.png" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" esd-img-prev-position="center center">
            <tbody>
                <tr>
                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                                <tr>
                                    <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" class="esd-block-image" style="font-size: 0px;">
                                                        <a target="_blank" href="https://viewstripo.email">
                                                            <img src="https://fidnzci.stripocdn.email/content/guids/CABINET_0e8fbb6adcc56c06fbd3358455fdeb41/images/group.png" alt="Logo" style="display: block;" title="Logo" height="55">
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="560" valign="top" align="center">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td align="center" class="esd-block-text">
                                                        <h1>Hello, {{name}}<br><br>Verify your email to get started!</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-image es-p15t es-p10b" style="font-size: 0px;">
                                                        <a target="_blank" href="https://viewstripo.email">
                                                            <img class="adapt-img" src="https://fidnzci.stripocdn.email/content/guids/CABINET_dee64413d6f071746857ca8c0f13d696/images/852converted_1x3.png" alt="" style="display: block;" height="300">
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                        <p>Verifying your primary email address ensures strengthened security, allows our staff to better assist you if you forget your password, and gives you access to more features.</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-button es-p15t es-p15b">
                                                        <span class="es-button-border">
                                                            <a class="es-button" target="_blank" href="{{email_link}}">Verify Email</a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" class="esd-block-text es-p10t es-p10b">
                                                        <p>​</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</body>
</html>
`;
