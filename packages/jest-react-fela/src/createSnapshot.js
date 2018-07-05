import React, { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(createElement, render, Provider)