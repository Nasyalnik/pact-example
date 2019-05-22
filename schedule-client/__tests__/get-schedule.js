const { Pact } = require("@pact-foundation/pact");
const fetch = require("node-fetch");
const path = require("path");

describe("pact", () => {
  const provider = new Pact({
    consumer: "aggregator-client",
    provider: "aggregator-service",
    port: 21234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "WARN",
    spec: 2
  });

  describe("interaction", () => {
    beforeAll(done => {
      provider.setup().then(() =>
        provider
          .addInteraction({
            uponReceiving: "a request for schedule",
            withRequest: {
              method: "GET",
              path: "/schedule",
              headers: {
                Accept: "application/json"
              }
            },
            willRespondWith: {
              status: 200,
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              },
              body: {
                talks: [
                  {
                    title:
                      "Изготовление качественных шерстяных изделий в условиях невесомости",
                    speakers: [
                      {
                        name: "Фубар Базов"
                      }
                    ],
                    time: "2019-05-27T12:00:00+03:00"
                  }
                ]
              }
            }
          })
          .then(() => done())
      );
    });

    it("does something useful", done => {
      fetch("http://localhost:21234/schedule", {
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(json =>
          expect(json).toStrictEqual({
            talks: [
              {
                title:
                  "Изготовление качественных шерстяных изделий в условиях невесомости",
                speakers: [
                  {
                    name: "Фубар Базов"
                  }
                ],
                time: "2019-05-27T12:00:00+03:00"
              }
            ]
          })
        )
        .then(() => done());
    });

    afterAll(() => provider.finalize());
  });
});
