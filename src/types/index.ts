import type { StaticImageData } from "next/image"
import type { ElementType, ReactElement, ReactNode, RefObject } from "react"
import {
	RndDragCallback,
	RndResizeCallback,
	RndResizeStartCallback
} from "react-rnd"

export interface Task {
	id: string
	active: boolean

	window?: Window
	application: Application

	taskWillEnd?: () => void
}

export interface ApplicationOptions {
	name: string
	icons: {
		16: StaticImageData
		32?: StaticImageData
		48?: StaticImageData
	}

	resizable: boolean
	singleton: boolean
	toolWindow: boolean
	maximizeButton: boolean
	minimizeButton: boolean
	closeButton: boolean

	position: {
		x: number
		y: number
	}
	size: {
		width: number | string
		height: number | string
	}
	minSize: {
		width: number | string
		height: number | string
	}
}

export interface Application extends ApplicationOptions {
	AppComponent: (props: any) => JSX.Element
}

export interface Window {
	id: string
	title: string
	icons: {
		16: StaticImageData
		32?: StaticImageData
		48?: StaticImageData
	}

	toolWindow: boolean
	maximizeButton: boolean
	minimizeButton: boolean
	closeButton: boolean

	active: boolean
	focused: boolean
	minimized: boolean
	resizable: boolean
	maximized: boolean

	size: {
		width: number | string
		height: number | string
	}
	minSize: {
		width: number | string
		height: number | string
	}
	position: {
		x: number
		y: number
	}

	open: () => void
	close: () => void
	focus: () => void
	minimize: () => void
	unminimize: () => void
	maximize: () => void
	restore: () => void
	move: (position: { x: number; y: number }) => void
	resize: (size: { width: number | string; height: number | string }) => void

	onResizeStart?: RndResizeStartCallback
	onResize: RndResizeCallback
	onResizeStop?: RndResizeCallback

	onDragStart?: RndDragCallback
	onDrag: RndDragCallback
	onDragStop?: RndDragCallback
}
