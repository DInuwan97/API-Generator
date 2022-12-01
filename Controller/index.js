exports.createObj = async (req, res, next) => {
  const obj = {
    clientId: req.body.clientId,
    subjectName: req.body.subjectName,
    subjectCredentials: [
      {
        methodId: req.body.methodId,
        collectedInputs: [
          {
            name: req.body.subjectCredentials[0].collectedInputs[0].name,
            value: req.body.subjectCredentials[0].collectedInputs[0].value,
          },
        ],
      },
    ],
    context: {
      authnAttemptId: req.body.context.authnAttemptId,
      messageId: req.body.context.messageId,
      inResponseTo: req.body.context.inResponseTo,
    },
  };

  try {
    let result = {
      context: {
        authnAttemptId: obj.context.authnAttemptId,
        messageId: obj.context.messageId,
        inResponseTo: obj.context.inResponseTo,
      },
      credentialValidationResults: [
        {
          methodId: "SECURID",
          methodResponseCode: "SUCCESS",
          methodReasonCode: null,
          authnAttributes: [],
        },
      ],
      attemptResponseCode: "SUCCESS",
      attemptReasonCode: "CREDENTIAL_VERIFIED",
      challengeMethods: {
        challenges: [
          {
            methodSetId: null,
            requiredMethods: [],
          },
        ],
      },
    };

    if (req.body.clientId != "apiHost") {
      res.status(403).json({
        "status-code": "7001",
        message: "client id is not matching",
      });
    } else if (req.body.subjectName != "test01") {
      res.status(403).json({
        "status-code": "7002",
        message: "Suubject name id is not matching",
      });
    } else if (
      req.body.subjectCredentials[0].collectedInputs[0].name != "SECURID"
    ) {
      res.status(403).json({
        "status-code": "7003",
        message: "Collected inputs name is not matching",
      });
    } else if (
      req.body.subjectCredentials[0].collectedInputs[0].value != "222222"
    ) {
      res.status(403).json({
        "status-code": "7004",
        message: "Collected inputs value is not matching",
      });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
