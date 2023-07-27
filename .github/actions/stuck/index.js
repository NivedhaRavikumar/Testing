const core = require('@actions/core')
const github = require('@actions/github')

const main = () => {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  const search = core.getInput('search')
  console.log(`Query ${search}`)

  /**
   * The token as provided in the YAML workflow.
   */
  const token = core.getInput('token')
  /**
   * Interface to interact with GitHub.
   */
  const octokit = github.getOctokit(token)

  const query = `
    query ($search: String!) {
      search(first: 5, query: $search, type: ISSUE) {
        repositoryCount
        nodes {
          ... on Issue {
            number
            title
            updatedAt
          }
        }
      }
    }
  `
  const variables = { search }

  octokit
    .graphql(query, variables)
    .then((result) => {
      console.log(`Result ${JSON.stringify(result, undefined, 2)}`)

      core.setOutput('count', 0)
      return undefined
    })
    .catch((error) => core.setFailed(error.message))
}

main()
