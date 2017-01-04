'use babel';

import { CompositeDisposable } from 'atom';
import axios from 'axios';

export default {

  subscriptions: null,

  activate() {

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codexpost:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  fetch() {
    let editor
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let selected = editor.getSelectedText()
      let language = editor.getGrammar().name
      let url = '/api-snippets'
      atom.notifications.addSuccess('Something Working!')

      self.post(selected, language, url)
        .then(() => {
          atom.notifications.addSuccess(language)
          return self.post(selected, language, url)
        })
        .then((res) => {
          console.log(res)
          atom.notifications.addSuccess('Added Snippet to Codex!')
        })
        .catch((error) => {
          atom.notifications.addWarning('huh?')
          atom.notifications.addWarning(error.reason)
        })
    }
  },

  post(selected, language, url) {
    atom.notifications.addSuccess('Got into post!')
    let snippetObject = {
      title: 'atom snippet',
      codeSnippet: selected,
      language: language,
      keywords: 'atom',
      notes: ''
    }
    atom.notifications.addSuccess('Got past variable declarations')
    atom.notifications.addSuccess(url)
    axios.post(url, snippetObject)
      .then((res)=> {
        atom.notifications.addSuccess('Got into axios!')
        console.log('posted from Atom Editor')
      })
      .catch((err) => {
        console.error(err)
      })
  }


}
