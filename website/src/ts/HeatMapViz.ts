/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Reason for disable: d3 interfaces often return and expect any types,
// e.g. generic types of 'select'
import * as d3 from 'd3'
import { User, Users } from './User'
import { TooltipModel } from './TooltipModel'

type column = { group: string; variable: string; value: number }
const margin = { top: 0, right: 0, bottom: 0, left: 0 }

export class HeatMap {
    private container: any
    private users: Users
    private data: column[] = []
    private tooltip: TooltipModel

    constructor(containerSelector: string, users: Users, tooltip: TooltipModel) {
        this.users = users
        this.tooltip = tooltip

        this.initializeContainer(containerSelector)
        this.initializeData()

        this.redraw()
    }

    private redraw() {
        this.cleanContainer()

        const myGroups = Array.from(new Set(this.data.map((d) => d.group)))
        const myVars = Array.from(new Set(this.data.map((d) => d.variable)))
        const myVals = Array.from(new Set(this.data.map((d) => d.value)))
        const width = this.containerWidth()
        const height = this.containerHeight()

        this.container
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        // Build X scales and axis:
        const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05)
        this.container
            .append('g')
            .style('font-size', 12)
            .attr('transform', `translate(0, ${width})`)
            .call(d3.axisBottom(x).tickSize(0))
            .select('.domain')
            .remove()

        // Build Y scales and axis:
        const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05)
        this.container
            .append('g')
            .style('font-size', 6)
            .call(d3.axisLeft(y).tickSize(0))
            .select('.domain')
            .remove()

        // Build color scale
        const myColor = d3.scaleSequential().interpolator(d3.interpolateInferno).domain(myVals)

        // add the squares
        this.container
            .selectAll()
            .data(this.data, function (d) {
                return d.group + ':' + d.variable
            })
            .join('rect')
            .attr('x', function (d) {
                return x(d.group)
            })
            .attr('y', function (d) {
                return y(d.variable)
            })
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .style('fill', function (d) {
                return myColor(d.value)
            })
            .style('stroke-width', 4)
            .style('stroke', 'none')
            .style('opacity', 0.8)
            .on('mouseenter', (event, d) => {
                this.tooltip.display()
                this.tooltip.updateContent(d.variable + '<br>' + d.value + ' <br> User:' + d.group)
                setHoverColor(event)
            })
            .on('mousemove', (event: any) => this.tooltip.updatePosition(event.pageX, event.pageY))
            .on('mouseout', (event, d) => {
                this.tooltip.hide()
                resetColor(event, d)
            })

        const setHoverColor = function (event) {
            d3.select(event.currentTarget).style('fill', 'white')
        }
        const resetColor = function (event: PointerEvent, d) {
            d3.select(event.currentTarget).style('fill', myColor(d.value))
        }
    }

    private initializeData() {
        const idUser: [string, User][] = Object.entries(this.users)
        this.data = idUser
            .map((entry) => [
                {
                    group: entry[0],
                    variable: 'HATE_SPEECH',
                    value: entry[1].HATE_SPEECH
                },
                { group: entry[0], variable: 'RELIGIOUS', value: entry[1].RELIGIOUS },
                { group: entry[0], variable: 'WEBSITE', value: entry[1].WEBSITE },
                {
                    group: entry[0],
                    variable: 'CHILD_GROOMING',
                    value: entry[1].CHILD_GROOMING
                },
                {
                    group: entry[0],
                    variable: 'PUBLIC_THREAT',
                    value: entry[1].PUBLIC_THREAT
                },
                { group: entry[0], variable: 'EXTREMISM', value: entry[1].EXTREMISM },
                {
                    group: entry[0],
                    variable: 'SUBVERSIVE',
                    value: entry[1].SUBVERSIVE
                },
                { group: entry[0], variable: 'SENTIMENT', value: entry[1].SENTIMENT },
                { group: entry[0], variable: 'POLITICS', value: entry[1].POLITICS }
            ])
            .flatMap((arr) => arr)
    }

    private initializeContainer(containerSelector: string) {
        const bounds = (d3.select(containerSelector) as any).node().getBoundingClientRect() ?? {
            width: 1280,
            height: 720
        }

        this.container = d3
            .select(containerSelector)
            .append('svg:svg')
            .attr('width', bounds.width)
            .attr('height', bounds.height)
    }

    private cleanContainer() {
        this.container.selectAll('*').remove()
    }

    private containerWidth(): number {
        return this.container.node().getBoundingClientRect().width
    }

    private containerHeight(): number {
        return this.container.node().getBoundingClientRect().height
    }
}
