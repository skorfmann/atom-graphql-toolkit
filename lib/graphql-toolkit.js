'use babel';

import { CompositeDisposable } from 'atom';
import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql/utilities/schemaPrinter';

export default {

  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that sorts the schema
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'graphql-toolkit:sort': () => this.sortSchema()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  sortSchema() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let schema = makeExecutableSchema({typeDefs: editor.getSelectedText()})
      editor.insertText(printSchema(schema))
    }
  }

};
