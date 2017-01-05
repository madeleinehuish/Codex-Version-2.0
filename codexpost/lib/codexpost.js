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

      self.post(selected, language)
        .then((res) => {
          atom.notifications.addSuccess('Added Snippet to Codex!')
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
    atom.notifications.addSuccess('Got into post!')
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/api-snippets', snippetData )
        .then((res) => {
          atom.notifications.addSuccess('Successful Post with Axios!')
          resolve(body)
        })
        .catch((err) =>{
          reject({
            reason: 'Unable to post'
          })
        })

      // request.post({ url:'http://localhost:8000/api-snippets', formData: formData }, (error, response, body) => {
      //   if (!error && response.statusCode == 200) {
      //     resolve(body)
      //   } else {
      //     reject({
      //       reason: 'Unable to post'
      //     })
      //   }
      // })
    })

  }


}
