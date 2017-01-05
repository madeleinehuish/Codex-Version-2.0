'use babel';

import { CompositeDisposable } from 'atom';
import axios from 'axios';
import request from 'request';

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
      // let language = languageinit.split(" ").join(', ')

      self.post(selected, language)
        .then(() => {
          atom.notifications.addSuccess('Thumbs up!')
        })
        .catch((error) => {
          atom.notifications.addWarning(error.reason)
        })
    }
  },

  post(selected, language) {
    let snippetData = {
      title: 'atom snippet',
      codeSnippet: selected,
      language: language,
      keywords: 'atom',
      notes: ''
    }

    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/api-snippets', snippetData )
        .then((res) => {
          atom.notifications.addSuccess('Status : ' + res.status)
          if(res.status === 200) {
          atom.notifications.addSuccess('Successful Post with Axios!')
        }
          resolve(body)
        })
        .catch((err) =>{
          reject({
            // reason: 'Unable to post'
          })
        })
    })
  }
}
