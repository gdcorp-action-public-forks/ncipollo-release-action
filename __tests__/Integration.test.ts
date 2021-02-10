import {Action} from "../src/Action";
import * as github from "@actions/github";
import {FileArtifactGlobber} from "../src/ArtifactGlobber";
import {CoreInputs} from "../src/Inputs";
import {GithubReleases} from "../src/Releases";
import {GithubArtifactUploader} from "../src/ArtifactUploader";

describe('Integration Test', () => {
    let action: Action

    beforeEach(() => {
        const token = process.env.GITHUB_TOKEN ?? ""
        const context = github.context
        const git = github.getOctokit(token)
        const globber = new FileArtifactGlobber()

        const inputs = new CoreInputs(globber, context)
        const releases = new GithubReleases(context, git)
        const uploader = new GithubArtifactUploader(releases, inputs.replacesArtifacts)
        action = new Action(inputs, releases, uploader)
    })

    it('does the thing', async () => {
        expect(action).not.toBeNull()
    })

})
