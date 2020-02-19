/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import getNodeSibling from './getNodeSibling'

import type { NodeAttributes } from '../../../../../flowtypes/DOMNode'

export default function createNode(
  attributes: NodeAttributes,
  targetDocument: any = document,
  sortMediaQuery: Function,
  styleTagAttributes: Object
): Object {
  const head = targetDocument.head || {}
  const { type, media, support } = attributes

  const node = targetDocument.createElement('style')
  node.setAttribute('data-fela-type', type)
  node.type = 'text/css'

  if (support) {
    node.setAttribute('data-fela-support', 'true')
  }

  if (media) {
    node.media = media
  }

  // applying custom style tag attributes
  for (let attribute in styleTagAttributes) {
    node.setAttribute(attribute, styleTagAttributes[attribute])
  }

  const nodes = head.querySelectorAll('[data-fela-type]')
  const sibling = getNodeSibling([...nodes], attributes, sortMediaQuery)

  if (sibling) {
    head.insertBefore(node, sibling)
  } else {
    head.appendChild(node)
  }

  return node
}
