import h from 'snabbdom/h';

const cancelIcon = '&#x274c;';

export default {
  render(model: any, dispatcher: any) {
    return h('span.select-type__cancel', {
      hook: {
        // @ts-ignore
        postpatch: (oldVnode, vnode) => { vnode.elm.innerHTML = cancelIcon; },
        // @ts-ignore
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
