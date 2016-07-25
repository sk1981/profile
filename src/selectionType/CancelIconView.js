import h from 'snabbdom/h';

const cancelIcon = '&#x274c;';

export default {
  render(model, dispatcher) {
    return h('span.select-type__cancel', {
      hook: {
        postpatch: (oldVnode, vnode) => { vnode.elm.innerHTML = cancelIcon; },
        insert: (vnode) => { vnode.elm.innerHTML = cancelIcon; }
      },
      on: {
        mousedown: dispatcher.fullReset
      },
      class: {
        'select-type__cancel--selected': !model.active && !!model.selectedText
      }
      
    }, cancelIcon)
  }
}
