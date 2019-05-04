import SVG from 'svg.js';

/** Class representing all of the SVG canvas functionality. */
export class Canvas {
    private readonly gridSize: number;
    private boundary: HTMLElement;
    private draw: SVG.Doc;
    private grid: SVG.G;
    private horizontalLines: SVG.G;
    private verticalLines: SVG.G;
    private canvasSize: {width: number, height: number};

    /**
     * Get toolset boundary element, initialize SVG.js,
     * prepare SVG groups for grid lines, set grid size.
     * @param {string} id - Id of the boundary element, defaults to 'drawing'.
     * @param {number} gridSize - Size of one grid segment, defaults to 20px.
     */
    constructor(id: string = 'drawing', gridSize: number = 20) {
        this.boundary = document.getElementById(id)!;
        this.draw = SVG(id);
        this.grid = this.draw
            .group()
            .addClass('grid');
        this.horizontalLines = this.grid
            .group()
            .addClass('horizontal');
        this.verticalLines = this.grid
            .group()
            .addClass('vertical');
        this.gridSize = gridSize;
        this.canvasSize = this.calcSize();

        this.initialize();
    }

    initialize(): void {
        this.updateSize(true);
        window.addEventListener('resize', () => this.updateSize());
    }

    calcSize(): {width: number, height: number} {
        let quadSize: number = this.gridSize * 4,
            width: number = Math.round((this.boundary.offsetWidth - 100) / quadSize) * quadSize,
            height: number = Math.round((this.boundary.offsetHeight - 50) / quadSize) * quadSize;

        return {width: width, height: height};
    }

    setCanvasSize(size: {width: number, height: number}): void {
        if (!(size.width <= 0 || size.height <= 0)) {
            this.draw.node.setAttribute('width', size.width + 'px');
            this.draw.node.setAttribute('height', size.height + 'px');
        } else {
            if (size.width <= 0) this.draw.node.setAttribute('width', 80 + 'px');
            if (size.height <= 0) this.draw.node.setAttribute('height', 80 + 'px');
        }
    }

    updateSize(init: boolean = false): void {
        if (init) {
            this.setCanvasSize(this.canvasSize);
            this.drawHorizontalLines();
            this.drawVerticalLines();
        } else {
            let oldSize: {width: number, height: number} = this.canvasSize;
            this.canvasSize = this.calcSize();

            if (!(this.canvasSize.width === oldSize.width && this.canvasSize.height === oldSize.height)) {
                if (this.canvasSize.width !== oldSize.width) this.drawHorizontalLines();
                if (this.canvasSize.height !== oldSize.height) this.drawVerticalLines();
                this.setCanvasSize(this.canvasSize);
            }
        }
    }

    drawHorizontalLines(): void {
        this.horizontalLines.clear();
        let xCoord: number = this.gridSize;

        while (xCoord < this.canvasSize.height) {
            this.horizontalLines.line([[0, xCoord], [this.canvasSize.width, xCoord]])
                .stroke({width: 2})
                .addClass('gridLine');

            xCoord = xCoord + this.gridSize;
        }
    }

    drawVerticalLines(): void {
        this.verticalLines.clear();
        let yCoord: number = this.gridSize;

        while (yCoord < this.canvasSize.width) {
            this.verticalLines.line([[yCoord, 0], [yCoord, this.canvasSize.height]])
                .stroke({width: 2})
                .addClass('gridLine');

            yCoord = yCoord + this.gridSize;
        }
    }
}