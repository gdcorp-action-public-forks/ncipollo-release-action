import {Action} from "../src/Action";
import * as github from "@actions/github";
import {Inputs} from "../src/Inputs";
import {GithubReleases} from "../src/Releases";
import {GithubArtifactUploader} from "../src/ArtifactUploader";

describe('Integration Test', () => {
    let action: Action

    beforeEach(() => {
        const token = getToken()
        const context = github.context
        const git = github.getOctokit(token)

        const inputs = getInputs()
        const releases = new GithubReleases(context, git)
        const uploader = new GithubArtifactUploader(releases, inputs.replacesArtifacts)
        action = new Action(inputs, releases, uploader)
    })

    it('Performs action', async () => {
        await action.perform()
    })

    function getInputs(): Inputs {
        const MockInputs = jest.fn<Inputs, any>(() => {
            return {
                allowUpdates: true,
                artifacts: [],
                createdReleaseBody: "body",
                createdReleaseName: "title",
                commit: "",
                draft: true,
                owner: "ncipollo",
                prerelease: false,
                replacesArtifacts: true,
                repo: "actions-playground",
                tag: "0.0.71",
                token: getToken(),
                updatedReleaseBody: "updated body",
                updatedReleaseName: "updated title"
            }
        })
        return new MockInputs();
    }

    function getToken(): string {
        return process.env.GITHUB_TOKEN ?? ""
    }

})
