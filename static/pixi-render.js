(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("pixi.js"));
	else if(typeof define === 'function' && define.amd)
		define(["pixi.js"], factory);
	else if(typeof exports === 'object')
		exports["SVGGraphics"] = factory(require("pixi.js"));
	else
		root["SVGGraphics"] = factory(root["PIXI"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var PIXI = __webpack_require__(1)
	var color2color = __webpack_require__(2)

	function SVGGraphics (graphics) {
	  this._graphics = graphics
	}

	/**
	 * Draws the given node
	 * @param  {SVGElement} node
	 */
	SVGGraphics.prototype.drawNode = function (node, container) {
	  var tagName = node.type
		tagName = tagName.toLowerCase().replace('-','');
	  var capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1)
    // console.log(capitalizedTagName);

	  if (!this['draw' + capitalizedTagName + 'Node']) {
	    console.warn('No drawing behavior for ' + capitalizedTagName + ' node')
	  } else {
	    this['draw' + capitalizedTagName + 'Node'](node)
	  }
	}

  /**
	 * Draws the given root SVG node (and handles it as a group)
	 * @param  {SVGSVGElement} node
	 */
	SVGGraphics.prototype.drawGroupNode = function (node) {
    // console.log(node);
	  this.drawGNode(node)
	}

	/**
	 * Draws the given root SVG node (and handles it as a group)
	 * @param  {SVGSVGElement} node
	 */
	SVGGraphics.prototype.drawPathgroupNode = function (node) {
    // console.log(node);
    // this.applySvgAttributes(node)
	  this.drawGNode(node)
	}

	/**
	 * Draws the given group svg node
	 * @param  {SVGGroupElement} node
	 */
	SVGGraphics.prototype.drawGNode = function (node) {
	  var children = node.paths || node.objects
    // console.log(children);
    var isGroup = false;
    if(node.objects) {
      console.log(node);
      isGroup = true;
    }
	  var child
	  for (var i = 0, len = children.length; i < len; i++) {
	    child = children[i]
	    // if (child.type !== 1) { continue }
	    this.drawNode(child,isGroup)
	  }
	}

	/**
	 * Draws the given line svg node
	 * @param  {SVGLineElement} node
	 */
	SVGGraphics.prototype.drawLineNode = function (node) {
	  this.applySvgAttributes(node)

	  var x1 = parseFloat(node.getAttribute('x1'))
	  var y1 = parseFloat(node.getAttribute('y1'))
	  var x2 = parseFloat(node.getAttribute('x2'))
	  var y2 = parseFloat(node.getAttribute('y2'))

	  this._graphics.moveTo(x1, y1)
	  this._graphics.lineTo(x2, y2)
	}

	/**
	 * Draws the given polyline svg node
	 * @param  {SVGPolylineElement} node
	 */
	SVGGraphics.prototype.drawPolylineNode = function (node) {
	  this.applySvgAttributes(node)

	  var points = node.points;
	  for (var i = 0, len = points.length; i < len; i++) {


	    if (i === 0) {
	      this._graphics.moveTo(coords[0].x, coords[0].y)
	    } else {
	      this._graphics.lineTo(coords[i].x, coords[i].y)
	    }
	  }
	}

	/**
	 * Draws the given circle node
	 * @param  {SVGCircleElement} node
	 */
	SVGGraphics.prototype.drawCircleNode = function (node) {
	  // this.applySvgAttributes(node)
		//
	  // var cx = node.left+(node.width/2)
	  // var cy = node.top+(node.height/2)
	  // var r = node.radius
		//
	  // this._graphics.drawCircle(cx, cy, r)
	}

	/**
	 * Draws the given ellipse node
	 * @param  {SVGCircleElement} node
	 */
	SVGGraphics.prototype.drawEllipseNode = function (node) {
	  this.applySvgAttributes(node)

	  var cx = parseFloat(node.getAttribute('cx'))
	  var cy = parseFloat(node.getAttribute('cy'))
	  var rx = parseFloat(node.getAttribute('rx'))
	  var ry = parseFloat(node.getAttribute('ry'))

	  this._graphics.drawEllipse(cx, cy, rx, ry)
	}

	/**
	 * Draws the given rect node
	 * @param  {SVGRectElement} node
	 */
	SVGGraphics.prototype.drawRectNode = function (node) {
	  this.applySvgAttributes(node)

	  var x = node.left;//parseFloat(node.getAttribute('x'))
	  var y = node.top;//parseFloat(node.getAttribute('y'))
	  var width = node.width;//parseFloat(node.getAttribute('width'))
	  var height = node.height;//parseFloat(node.getAttribute('height'))

	  this._graphics.drawRect(x, y, width, height)
	}

	/**
	 * Draws the given polygon node
	 * @param  {SVGPolygonElement} node
	 */
	SVGGraphics.prototype.drawPolygonNode = function (node) {

    var path = node.points
	  this.applySvgAttributes(node)
	  this._graphics.drawPolygon(path)
	}

		SVGGraphics.prototype.drawPathNode = function (node) {
			// this.applySvgAttributes(node);
			var paths = node.path;
			var x = 0;
			var y = 0;
			var offsetX = 0;//-node.pathOffset.x;
			var offsetY = 0;//-node.pathOffset.y;
			var subX = 0;
			var subY = 0;
			var tempX = 0;
			var tempY = 0;
			var controlX = 0;
			var controlY = 0;
			var previous = null;
			var pathIndex = 0;
			if(paths.length !== 12) {
				return;
			}
			var _paths = [];
			_paths.push(["M", 18, 2.3]);
			_paths.push(["c", -8.8, 0, -16, 7.2, -16, 16]);
			_paths.push(["s", 7.2, 16, 16, 16]);
			_paths.push(["c", 8.8, 0, 16, -7.2, 16, -16]);
			_paths.push(["S", 26.8, 2.3, 18, 2.3]);
			_paths.push(["z"]);
			_paths.push(["M", 18, 32.8]);
			_paths.push(["c", -8, 0, -14.5, -6.5, -14.5, -14.5]);
			_paths.push(["S", 10, 3.8, 18, 3.8]);
			_paths.push(["c", 8, 0, 14.5, 6.5, 14.5, 14.5]);
			_paths.push(["S", 26, 32.8, 18, 32.8]);
			_paths.push(["z"]);

			console.log(_paths);
			this._graphics.lineStyle(.1, 0xffd900, 1);
			this._graphics.beginFill(0xFF3300);
			for(var i = 0; i<_paths.length; i++) {
				var path = _paths[i];
				console.log(path);
				var pathType = path[0];
				switch (pathType) {
					case 'M':
						x = path[1];
						y = path[2];
						subX = x;
						subY = y;
						if(pathIndex == 0) {
							this._graphics.moveTo(x + offsetX, y + offsetY);
						} else {
							this._graphics.lineTo(x + offsetX, y + offsetY);
						}
						pathIndex ++;
						break;
					case 'm':
						x += path[1];
						y += path[2];
						subX = x;
						subY = y;
						if(pathIndex == 0) {
							this._graphics.moveTo(x + offsetX, y + offsetY);
						} else {
							this._graphics.lineTo(x + offsetX, y + offsetY);
						}
						pathIndex ++;
						break;
					case 'L':
						x = path[1];
						y = path[2];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'l':
						x += path[1];
						y += path[2];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'V':
						y = path[1];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'v':
						y += path[1];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'H':
						x = path[1];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'h':
						x += path[1];
						this._graphics.lineTo(x + offsetX, y + offsetY);
						break;
					case 'C':
						tempX = path[5];
						tempY = path[6];
						controlX = path[3];
						controlY = path[4];
						this._graphics.bezierCurveTo(
							path[1] + offsetX, // x1
              path[2] + offsetY, // y1
              controlX + offsetX, // x2
              controlY + offsetY, // y2
              tempX + offsetX,
              tempY + offsetY
						);
						x = tempX;
						y = tempY;
						break;
					case 'c':
						tempX = x + path[5];
						tempY = y + path[6];
						controlX = x + path[3];
						controlY = y + path[4];
						this._graphics.bezierCurveTo(
							x + path[1] + offsetX, // x1
							y + path[2] + offsetY, // y1
							controlX + offsetX, // x2
							controlY + offsetY, // y2
							tempX + offsetX,
							tempY + offsetY
						);
						x = tempX;
						y = tempY;
						break;
					case 'S':
						tempX = path[3];
						tempY = path[4];
						if (previous[0].match(/[CcSs]/) === null) {
							controlX = x;
              controlY = y;
						} else {
							controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
						}
						this._graphics.bezierCurveTo(
							controlX + offsetX, // x1
							controlY + offsetY, // y1
							path[1] + offsetX, // x2
							path[2] + offsetY, // y2
							tempX + offsetX,
							tempY + offsetY
						);
						x = tempX;
						y = tempY;
						break;
					case 's':
						tempX = x + path[3];
						tempY = y + path[4];
						if (previous[0].match(/[CcSs]/) === null) {
							controlX = x;
              controlY = y;
						} else {
							controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
						}
						this._graphics.bezierCurveTo(
							controlX + offsetX, // x1
							controlY + offsetY, // y1
							x + path[1] + offsetX, // x2
							y + path[2] + offsetY, // y2
							tempX + offsetX,
							tempY + offsetY
						);
						controlX = x + path[1];
            controlY = y + path[2];
						x = tempX;
						y = tempY;
						break;
					case 'Z':
						x = subX;
						y = subY;
						this._graphics.closePath();
						break;
					case 'z':
						this._graphics.closePath();
						break;
					default:

				}
				previous = path;
				// this._graphics.endFill();
			}

		}

	/**
	 * Draws the given path svg node
	 * @param  {SVGPathElement} node
	 */
	SVGGraphics.prototype.drawPathNode2 = function (node) {
	  this.applySvgAttributes(node)
    var commands = node.path
	  // var d = node.getAttribute('d').trim()
	  // var commands = d.match(/[a-df-z][^a-df-z]*/ig)
	  var command, firstCoord, lastCoord, lastControl

	  var pathIndex = 0
	  var triangles = []
	  var j, argslen
	  var lastPathCoord
		// console.log(commands);
		if(commands.length !== 12) {
			return;
		}
	  for (var i = 0, len = commands.length; i < len; i++) {
	    command = commands[i]
	    var commandType = command[0]
	    var args = command.slice(1)

	    var offset = {
	      x: 0,
	      y: 0
	    }
	    if (commandType === commandType.toLowerCase()) {
	      // Relative positions
	      offset = lastCoord
	    }

				// console.log(commandType)

	    switch (commandType.toLowerCase()) {
	      // moveto command
	      case 'm':
	        args[0] += offset.x
	        args[1] += offset.y
	        if (pathIndex === 0) {
	          // First path, just moveTo()
	          this._graphics.moveTo(args[0], args[1])
	        } else if (pathIndex === 1) {
	          // Second path, use lastCoord as lastPathCoord
	          lastPathCoord = {
	            x: lastCoord.x,
	            y: lastCoord.y
	          }
	        }

	        if (pathIndex > 1) {
	          // Move from lastCoord to lastPathCoord
	          this._graphics.lineTo(lastPathCoord.x, lastCoord.y)
	          this._graphics.lineTo(lastPathCoord.x, lastPathCoord.y)
	        }

	        if (pathIndex >= 1) {
	          // Move from lastPathCoord to new coord
	          this._graphics.lineTo(lastPathCoord.x, args[1])
	          this._graphics.lineTo(args[0], args[1])
	        }

	        if (!firstCoord) {
	          firstCoord = { x: args[0], y: args[1] }
	        }
	        lastCoord = { x: args[0], y: args[1] }
	        pathIndex++
	        break
	      // lineto command
	      case 'l':
	        args[0] += offset.x
	        args[1] += offset.y

	        this._graphics.lineTo(
	          args[0],
	          args[1]
	        )
	        lastCoord = { x: args[0], y: args[1] }
	        break
	      // curveto command
	      case 'c':
	        for (var k = 0, klen = args.length; k < klen; k += 2) {
	          args[k] += offset.x
	          args[k + 1] += offset.y
	        }

	        this._graphics.bezierCurveTo(
	          args[0],
	          args[1],
	          args[2],
	          args[3],
	          args[4],
	          args[5]
	        )
	        lastCoord = { x: args[4], y: args[5] }
	        lastControl = { x: args[2], y: args[3] }
	        break
	      // vertial lineto command
	      case 'v':
	        args[0] += offset.y

	        this._graphics.lineTo(lastCoord.x, args[0])
	        lastCoord.y = args[0]
	        break
	      // horizontal lineto command
	      case 'h':
	        args[0] += offset.x

	        this._graphics.lineTo(args[0], lastCoord.y)
	        lastCoord.x = args[0]
	        break
	      // quadratic curve command
	      case 's':
	        for (var l = 0, llen = args.length; l < llen; l += 2) {
	          args[l] += offset.x
	          args[l + 1] += offset.y
	        }

	        var rx = 2 * lastCoord.x - lastControl.x
	        var ry = 2 * lastCoord.y - lastControl.y

	        this._graphics.bezierCurveTo(
	          rx,
	          ry,
	          args[0],
	          args[1],
	          args[2],
	          args[3]
	        )
	        lastCoord = { x: args[2], y: args[3] }
	        lastControl = { x: args[0], y: args[1] }
	        break
	      // closepath command
	      case 'z':
					console.log(lastCoord);
					console.log(firstCoord);
					// lastCoord = firstCoord;
					// this._graphics.closePath();
	        // Z command is handled by M
	        break
	      default:
	        throw new Error('Could not handle path command: ' + commandType + ' ' + args.join(','))
	    }
	  }

	  if (pathIndex > 1) {
	    // Move from lastCoord to lastPathCoord
	    this._graphics.lineTo(lastPathCoord.x, lastCoord.y)
	    this._graphics.lineTo(lastPathCoord.x, lastPathCoord.y)
	  }
	}

	SVGGraphics.prototype.drawPathNode1 = function (node) {
		this.applySvgAttributes(node)
		var ctx = this._graphics;
      var current, // current instruction
          previous = null,
          subpathStartX = 0,
          subpathStartY = 0,
          x = 0, // current x
          y = 0, // current y
          controlX = 0, // current control point x
          controlY = 0, // current control point y
          tempX,
          tempY,
          l = 0;//-node.pathOffset.x,
          t = 0;//-node.pathOffset.y;

      if (node.type === 'path-group') {
				console.log(11);
        l = 0;
        t = 0;
      }

      // this._graphics.beginPath();

      for (var i = 0, len = node.path.length; i < len; ++i) {

        current = node.path[i];

        switch (current[0]) { // first letter

          case 'l': // lineto, relative
            x += current[1];
            y += current[2];
            ctx.lineTo(x + l, y + t);
            break;

          case 'L': // lineto, absolute
            x = current[1];
            y = current[2];
            ctx.lineTo(x + l, y + t);
            break;

          case 'h': // horizontal lineto, relative
            x += current[1];
            ctx.lineTo(x + l, y + t);
            break;

          case 'H': // horizontal lineto, absolute
            x = current[1];
            ctx.lineTo(x + l, y + t);
            break;

          case 'v': // vertical lineto, relative
            y += current[1];
            ctx.lineTo(x + l, y + t);
            break;

          case 'V': // verical lineto, absolute
            y = current[1];
            ctx.lineTo(x + l, y + t);
            break;

          case 'm': // moveTo, relative
            x += current[1];
            y += current[2];
            subpathStartX = x;
            subpathStartY = y;
            ctx.moveTo(x + l, y + t);
            break;

          case 'M': // moveTo, absolute
            x = current[1];
            y = current[2];
            subpathStartX = x;
            subpathStartY = y;
            ctx.moveTo(x + l, y + t);
            break;

          case 'c': // bezierCurveTo, relative
            tempX = x + current[5];
            tempY = y + current[6];
            controlX = x + current[3];
            controlY = y + current[4];
            ctx.bezierCurveTo(
              x + current[1] + l, // x1
              y + current[2] + t, // y1
              controlX + l, // x2
              controlY + t, // y2
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;

          case 'C': // bezierCurveTo, absolute
            x = current[5];
            y = current[6];
            controlX = current[3];
            controlY = current[4];
            ctx.bezierCurveTo(
              current[1] + l,
              current[2] + t,
              controlX + l,
              controlY + t,
              x + l,
              y + t
            );
            break;

          case 's': // shorthand cubic bezierCurveTo, relative

            // transform to absolute x,y
            tempX = x + current[3];
            tempY = y + current[4];

            if (previous[0].match(/[CcSs]/) === null) {
              // If there is no previous command or if the previous command was not a C, c, S, or s,
              // the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }
            else {
              // calculate reflection of previous control points
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            }

            ctx.bezierCurveTo(
              controlX + l,
              controlY + t,
              x + current[1] + l,
              y + current[2] + t,
              tempX + l,
              tempY + t
            );
            // set control point to 2nd one of this command
            // "... the first control point is assumed to be
            // the reflection of the second control point on
            // the previous command relative to the current point."
            controlX = x + current[1];
            controlY = y + current[2];

            x = tempX;
            y = tempY;
            break;

          case 'S': // shorthand cubic bezierCurveTo, absolute
            tempX = current[3];
            tempY = current[4];
            if (previous[0].match(/[CcSs]/) === null) {
              // If there is no previous command or if the previous command was not a C, c, S, or s,
              // the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }
            else {
              // calculate reflection of previous control points
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            }
            ctx.bezierCurveTo(
              controlX + l,
              controlY + t,
              current[1] + l,
              current[2] + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;

            // set control point to 2nd one of this command
            // "... the first control point is assumed to be
            // the reflection of the second control point on
            // the previous command relative to the current point."
            controlX = current[1];
            controlY = current[2];

            break;

          case 'q': // quadraticCurveTo, relative
            // transform to absolute x,y
            tempX = x + current[3];
            tempY = y + current[4];

            controlX = x + current[1];
            controlY = y + current[2];

            ctx.quadraticCurveTo(
              controlX + l,
              controlY + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;

          case 'Q': // quadraticCurveTo, absolute
            tempX = current[3];
            tempY = current[4];

            ctx.quadraticCurveTo(
              current[1] + l,
              current[2] + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            controlX = current[1];
            controlY = current[2];
            break;

          case 't': // shorthand quadraticCurveTo, relative

            // transform to absolute x,y
            tempX = x + current[1];
            tempY = y + current[2];

            if (previous[0].match(/[QqTt]/) === null) {
              // If there is no previous command or if the previous command was not a Q, q, T or t,
              // assume the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }
            else {
              // calculate reflection of previous control point
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            }

            ctx.quadraticCurveTo(
              controlX + l,
              controlY + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;

            break;

          case 'T':
            tempX = current[1];
            tempY = current[2];

            if (previous[0].match(/[QqTt]/) === null) {
              // If there is no previous command or if the previous command was not a Q, q, T or t,
              // assume the control point is coincident with the current point
              controlX = x;
              controlY = y;
            }
            else {
              // calculate reflection of previous control point
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            }
            ctx.quadraticCurveTo(
              controlX + l,
              controlY + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;

          case 'a':
            // TODO: optimize this
            drawArc(ctx, x + l, y + t, [
              current[1],
              current[2],
              current[3],
              current[4],
              current[5],
              current[6] + x + l,
              current[7] + y + t
            ]);
            x += current[6];
            y += current[7];
            break;

          case 'A':
            // TODO: optimize this
            drawArc(ctx, x + l, y + t, [
              current[1],
              current[2],
              current[3],
              current[4],
              current[5],
              current[6] + l,
              current[7] + t
            ]);
            x = current[6];
            y = current[7];
            break;

          case 'z':
          case 'Z':
            x = subpathStartX;
            y = subpathStartY;
            ctx.closePath();
            break;
        }
        previous = current;
      }
    }


  SVGGraphics.prototype.setAttribute = function(node) {
    console.log(node);
    this._graphics.x = node.left;
    this._graphics.y = node.top;
    this._graphics.width = node.width;
    this._graphics.height = node.height;
    this._graphics.scale.x = node.scaleX;
    this._graphics.scale.y = node.scaleY;
  }

	/**
	 * Applies the given node's attributes to our PIXI.Graphics object
	 * @param  {SVGElement} node
	 */
	SVGGraphics.prototype.applySvgAttributes = function (node) {
	  // Apply stroke style
	  var strokeColor = 0x000000, strokeWidth = 1, strokeAlpha = 0

	  var color, intColor
	  if (node.stroke) {
	    color = color2color(node.stroke, 'array')
	    intColor = 256 * 256 * color[0] + 256 * color[1] + color[2]
	    strokeColor = intColor
	    strokeAlpha = color[3]
	  }

	  if (node.strokeWidth) {
	    strokeWidth = node.strokeWidth
	  }
	  this._graphics.lineStyle(strokeWidth, strokeColor, strokeAlpha)

	  // Apply fill style
	  var fillColor = 0x000000, fillAlpha = 0
	  if (node.fill) {
	    color = color2color(node.fill, 'array')
	    intColor = 256 * 256 * color[0] + 256 * color[1] + color[2]
	    fillColor = intColor
	    fillAlpha = color[3]
	    this._graphics.beginFill(fillColor, fillAlpha)
	  }
	}

	/**
	 * Builds a PIXI.Graphics object from the given SVG document
	 * @param  {PIXI.Graphics} graphics
	 * @param  {SVGDocument} svg
	 */
	SVGGraphics.drawSVG = function (graphics, obj, container) {
	  var svgGraphics = new SVGGraphics(graphics)
    var type = obj.type;
    if(type == 'path-group') {
      var children = obj.paths
      for (var i = 0, len = children.length; i < len; i++) {
  	    // if (children[i].type !== 1) { continue }
  	    svgGraphics.drawNode(children[i])
  	  }
    } else {
      svgGraphics.drawNode(obj, container)
    }

	}

	module.exports = SVGGraphics;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	 color2color v0.2.1 indyarmy.com
	 by Russ Porosky
	 IndyArmy Network, Inc.
	 */

	"use strict";
	var color2color = (function () {
	  var color2color = function (color, newColor, calculateOpacity) {
	    if (!newColor) {
	      newColor = "rgba";
	    }
      if(color.type) {
        return [];
      }
	    color = color.toLowerCase();
	    newColor = newColor.toLowerCase();

	    var namedColor = getNamedColor(color),
	      colorDefs = [
	        {
	          re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
	          example: [ "rgb(123, 234, 45)", "rgb(255,234,245)" ],
	          process: function (bits) {
	            return [
	              parseInt(bits[ 1 ], 10), parseInt(bits[ 2 ], 10), parseInt(bits[ 3 ], 10), 1
	            ];
	          }
	        },
	        {
	          re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/,
	          example: [ "rgba(123, 234, 45, 1)", "rgba(255,234,245, 0.5)" ],
	          process: function (bits) {
	            return [
	              parseInt(bits[ 1 ], 10), parseInt(bits[ 2 ], 10), parseInt(bits[ 3 ], 10), parseFloat(bits[ 4 ])
	            ];
	          }
	        },
	        {
	          re: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
	          example: [ "hsl(120, 100%, 25%)", "hsl(0, 100%, 50%)" ],
	          process: function (bits) {
	            bits[ 4 ] = 1;
	            var rgba = hslToRgb(bits);
	            return [
	              rgba.r, rgba.g, rgba.b, rgba.a
	            ];
	          }
	        },
	        {
	          re: /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/,
	          example: [ "hsla(120, 100%, 25%, 1)", "hsla(0, 100%, 50%, 0.5)" ],
	          process: function (bits) {
	            var rgba = hslToRgb(bits);
	            return [
	              rgba.r, rgba.g, rgba.b, rgba.a
	            ];
	          }
	        },
	        {
	          re: /^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
	          example: [ "hsv(120, 100%, 25%)", "hsl(0, 100%, 50%)" ],
	          process: function (bits) {
	            var rgb = hsvToRgb(bits);
	            return [
	              rgb.r, rgb.g, rgb.b, 1
	            ];
	          }
	        },
	        {
	          re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	          example: [ "#00ff00", "336699" ],
	          process: function (bits) {
	            return [
	              parseInt(bits[ 1 ], 16), parseInt(bits[ 2 ], 16), parseInt(bits[ 3 ], 16), 1
	            ];
	          }
	        },
	        {
	          re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	          example: [ "#fb0", "f0f" ],
	          process: function (bits) {
	            return [
	              parseInt(bits[ 1 ] + bits[ 1 ], 16), parseInt(bits[ 2 ] + bits[ 2 ], 16), parseInt(bits[ 3 ] + bits[ 3 ], 16), 1
	            ];
	          }
	        }
	      ], r, g, b, a, i, re, processor, bits, channels, min, hsl, hsv, retcolor;

	    if (namedColor) {
	      color = namedColor;
	    } else {
	      color = color.replace(/^\s*#|\s*$/g, "");
	      if (color.length === 3) {
	        color = color.replace(/(.)/g, "$1$1");
	      }
	    }

	    // search through the definitions to find a match
	    for (i = 0; i < colorDefs.length; i += 1) {
	      re = colorDefs[ i ].re;
	      processor = colorDefs[ i ].process;
	      bits = re.exec(color);
	      if (bits) {
	        channels = processor(bits);
	        r = channels[ 0 ];
	        g = channels[ 1 ];
	        b = channels[ 2 ];
	        a = channels[ 3 ];
	      }
	    }
	    r = ( r < 0 || isNaN(r) ) ? 0 : ( ( r > 255 ) ? 255 : r );
	    g = ( g < 0 || isNaN(g) ) ? 0 : ( ( g > 255 ) ? 255 : g );
	    b = ( b < 0 || isNaN(b) ) ? 0 : ( ( b > 255 ) ? 255 : b );
	    a = ( a < 0 || isNaN(a) ) ? 0 : ( ( a > 1 ) ? 1 : a );
	    switch (newColor) {
	      case "rgba":
	        if (calculateOpacity) {
	          a = ( 255 - ( min = Math.min(r, g, b) ) ) / 255;
	          r = ( 0 || ( r - min ) / a ).toFixed(0);
	          g = ( 0 || ( g - min ) / a ).toFixed(0);
	          b = ( 0 || ( b - min ) / a ).toFixed(0);
	          a = a.toFixed(4);
	        }
	        retcolor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	        break;
	      case "rgb":
	        retcolor = "rgb(" + r + "," + g + "," + b + ")";
	        break;
	      case "hex":
	        retcolor = "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
	        break;
	      case "hsl":
	        hsl = rgbToHsl({ "r": r, "g": g, "b": b });
	        retcolor = "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)";
	        break;
	      case "hsla":
	        hsl = rgbToHsl({ "r": r, "g": g, "b": b, "a": a });
	        retcolor = "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%," + hsl.a + ")";
	        break;
	      case "hsv":
	        hsv = rgbToHsv({ "r": r, "g": g, "b": b });
	        retcolor = "hsv(" + hsv.h + "," + hsv.s + "%," + hsv.v + "%)";
	        break;
	      case "array":
	        retcolor = [r, g, b, a];
	        break;
	    }
	    return retcolor;
	  },
	  hslToRgb = function (bits) {
	    var rgba = {}, v, q, p, hsl = {
	      h: toPercent(parseInt(bits[ 1 ], 10) % 360, 360),
	      s: toPercent(parseInt(bits[ 2 ], 10) % 101, 100),
	      l: toPercent(parseInt(bits[ 3 ], 10) % 101, 100),
	      a: parseFloat(bits[ 4 ])
	    };
	    if (hsl.s === 0) {
	      v = parseInt(Math.round(255 * hsl.l));
	      rgba = {
	        r: v,
	        g: v,
	        b: v,
	        a: hsl.a
	      };
	    } else {
	      q = hsl.l < 0.5 ? hsl.l * ( 1 + hsl.s ) : hsl.l + hsl.s - hsl.l * hsl.s;
	      p = 2 * hsl.l - q;
	      rgba.r = parseInt(( hueToRgb(p, q, hsl.h + 1 / 3) * 256 ).toFixed(0), 10);
	      rgba.g = parseInt(( hueToRgb(p, q, hsl.h) * 256 ).toFixed(0), 10);
	      rgba.b = parseInt(( hueToRgb(p, q, hsl.h - 1 / 3) * 256 ).toFixed(0), 10);
	      rgba.a = hsl.a;
	    }
	    return rgba;
	  },
	  rgbToHsl = function (rgba) {
	    rgba.r = toPercent(parseInt(rgba.r, 10) % 256, 256);
	    rgba.g = toPercent(parseInt(rgba.g, 10) % 256, 256);
	    rgba.b = toPercent(parseInt(rgba.b, 10) % 256, 256);
	    var max = Math.max(rgba.r, rgba.g, rgba.b), min = Math.min(rgba.r, rgba.g, rgba.b), hsl = [], d;
	    hsl.a = rgba.a;
	    hsl.l = ( max + min ) / 2;
	    if (max === min) {
	      hsl.h = 0;
	      hsl.s = 0;
	    } else {
	      d = max - min;
	      hsl.s = hsl.l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );
	      switch (max) {
	        case rgba.r:
	          hsl.h = ( rgba.g - rgba.b ) / d + ( rgba.g < rgba.b ? 6 : 0 );
	          break;
	        case rgba.g:
	          hsl.h = ( rgba.b - rgba.r ) / d + 2;
	          break;
	        case rgba.b:
	          hsl.h = ( rgba.r - rgba.g ) / d + 4;
	          break;
	      }
	      hsl.h /= 6;
	    }
	    hsl.h = parseInt(( hsl.h * 360 ).toFixed(0), 10);
	    hsl.s = parseInt(( hsl.s * 100 ).toFixed(0), 10);
	    hsl.l = parseInt(( hsl.l * 100 ).toFixed(0), 10);
	    return hsl;
	  },
	  hsvToRgb = function (bits) {
	    var rgb = {}, hsv = {
	        h: toPercent(parseInt(bits[ 1 ], 10) % 360, 360),
	        s: toPercent(parseInt(bits[ 2 ], 10) % 101, 100),
	        v: toPercent(parseInt(bits[ 3 ], 10) % 101, 100)
	      }, i = Math.floor(hsv.h * 6), f = hsv.h * 6 - i, p = hsv.v * ( 1 - hsv.s ), q = hsv.v * ( 1 - f * hsv.s ), t = hsv.v * ( 1 - ( 1 - f ) * hsv.s );
	    switch (i % 6) {
	      case 0:
	        rgb.r = hsv.v;
	        rgb.g = t;
	        rgb.b = p;
	        break;
	      case 1:
	        rgb.r = q;
	        rgb.g = hsv.v;
	        rgb.b = p;
	        break;
	      case 2:
	        rgb.r = p;
	        rgb.g = hsv.v;
	        rgb.b = t;
	        break;
	      case 3:
	        rgb.r = p;
	        rgb.g = q;
	        rgb.b = hsv.v;
	        break;
	      case 4:
	        rgb.r = t;
	        rgb.g = p;
	        rgb.b = hsv.v;
	        break;
	      case 5:
	        rgb.r = hsv.v;
	        rgb.g = p;
	        rgb.b = q;
	        break;
	    }
	    rgb.r = parseInt(rgb.r * 256, 10);
	    rgb.g = parseInt(rgb.g * 256, 10);
	    rgb.b = parseInt(rgb.b * 256, 10);
	    return {
	      "r": rgb.r,
	      "g": rgb.g,
	      "b": rgb.b
	    };
	  },
	  rgbToHsv = function (rgba) {
	    rgba.r = toPercent(parseInt(rgba.r, 10) % 256, 256);
	    rgba.g = toPercent(parseInt(rgba.g, 10) % 256, 256);
	    rgba.b = toPercent(parseInt(rgba.b, 10) % 256, 256);
	    var max = Math.max(rgba.r, rgba.g, rgba.b), min = Math.min(rgba.r, rgba.g, rgba.b), d = max - min, hsv = {
	        "h": 0,
	        "s": max === 0 ? 0 : d / max,
	        "v": max
	      };
	    if (max !== min) {
	      switch (max) {
	        case rgba.r:
	          hsv.h = ( rgba.g - rgba.b ) / d + ( rgba.g < rgba.b ? 6 : 0 );
	          break;
	        case rgba.g:
	          hsv.h = ( rgba.b - rgba.r ) / d + 2;
	          break;
	        case rgba.b:
	          hsv.h = ( rgba.r - rgba.g ) / d + 4;
	          break;
	      }
	      hsv.h /= 6;
	    }
	    hsv.h = parseInt(( hsv.h * 360 ).toFixed(0), 10);
	    hsv.s = parseInt(( hsv.s * 100 ).toFixed(0), 10);
	    hsv.v = parseInt(( hsv.v * 100 ).toFixed(0), 10);
	    return hsv;
	  },
	  hueToRgb = function (p, q, t) {
	    if (t < 0) {
	      t += 1;
	    }
	    if (t > 1) {
	      t -= 1;
	    }
	    if (t < 1 / 6) {
	      return p + ( q - p ) * 6 * t;
	    }
	    if (t < 1 / 2) {
	      return q;
	    }
	    if (t < 2 / 3) {
	      return p + ( q - p ) * ( 2 / 3 - t ) * 6;
	    }
	    return p;
	  },
	  toPercent = function (amount, limit) {
	    return amount / limit;
	  },
	  getNamedColor = function (color) {
	    var key, namedColor = null, namedColors = {
	        aliceblue: "f0f8ff",
	        antiquewhite: "faebd7",
	        aqua: "00ffff",
	        aquamarine: "7fffd4",
	        azure: "f0ffff",
	        beige: "f5f5dc",
	        bisque: "ffe4c4",
	        black: "000000",
	        blanchedalmond: "ffebcd",
	        blue: "0000ff",
	        blueviolet: "8a2be2",
	        brown: "a52a2a",
	        burlywood: "deb887",
	        cadetblue: "5f9ea0",
	        chartreuse: "7fff00",
	        chocolate: "d2691e",
	        coral: "ff7f50",
	        cornflowerblue: "6495ed",
	        cornsilk: "fff8dc",
	        crimson: "dc143c",
	        cyan: "00ffff",
	        darkblue: "00008b",
	        darkcyan: "008b8b",
	        darkgoldenrod: "b8860b",
	        darkgray: "a9a9a9",
	        darkgreen: "006400",
	        darkkhaki: "bdb76b",
	        darkmagenta: "8b008b",
	        darkolivegreen: "556b2f",
	        darkorange: "ff8c00",
	        darkorchid: "9932cc",
	        darkred: "8b0000",
	        darksalmon: "e9967a",
	        darkseagreen: "8fbc8f",
	        darkslateblue: "483d8b",
	        darkslategray: "2f4f4f",
	        darkturquoise: "00ced1",
	        darkviolet: "9400d3",
	        deeppink: "ff1493",
	        deepskyblue: "00bfff",
	        dimgray: "696969",
	        dodgerblue: "1e90ff",
	        feldspar: "d19275",
	        firebrick: "b22222",
	        floralwhite: "fffaf0",
	        forestgreen: "228b22",
	        fuchsia: "ff00ff",
	        gainsboro: "dcdcdc",
	        ghostwhite: "f8f8ff",
	        gold: "ffd700",
	        goldenrod: "daa520",
	        gray: "808080",
	        green: "008000",
	        greenyellow: "adff2f",
	        honeydew: "f0fff0",
	        hotpink: "ff69b4",
	        indianred: "cd5c5c",
	        indigo: "4b0082",
	        ivory: "fffff0",
	        khaki: "f0e68c",
	        lavender: "e6e6fa",
	        lavenderblush: "fff0f5",
	        lawngreen: "7cfc00",
	        lemonchiffon: "fffacd",
	        lightblue: "add8e6",
	        lightcoral: "f08080",
	        lightcyan: "e0ffff",
	        lightgoldenrodyellow: "fafad2",
	        lightgrey: "d3d3d3",
	        lightgreen: "90ee90",
	        lightpink: "ffb6c1",
	        lightsalmon: "ffa07a",
	        lightseagreen: "20b2aa",
	        lightskyblue: "87cefa",
	        lightslateblue: "8470ff",
	        lightslategray: "778899",
	        lightsteelblue: "b0c4de",
	        lightyellow: "ffffe0",
	        lime: "00ff00",
	        limegreen: "32cd32",
	        linen: "faf0e6",
	        magenta: "ff00ff",
	        maroon: "800000",
	        mediumaquamarine: "66cdaa",
	        mediumblue: "0000cd",
	        mediumorchid: "ba55d3",
	        mediumpurple: "9370d8",
	        mediumseagreen: "3cb371",
	        mediumslateblue: "7b68ee",
	        mediumspringgreen: "00fa9a",
	        mediumturquoise: "48d1cc",
	        mediumvioletred: "c71585",
	        midnightblue: "191970",
	        mintcream: "f5fffa",
	        mistyrose: "ffe4e1",
	        moccasin: "ffe4b5",
	        navajowhite: "ffdead",
	        navy: "000080",
	        oldlace: "fdf5e6",
	        olive: "808000",
	        olivedrab: "6b8e23",
	        orange: "ffa500",
	        orangered: "ff4500",
	        orchid: "da70d6",
	        palegoldenrod: "eee8aa",
	        palegreen: "98fb98",
	        paleturquoise: "afeeee",
	        palevioletred: "d87093",
	        papayawhip: "ffefd5",
	        peachpuff: "ffdab9",
	        peru: "cd853f",
	        pink: "ffc0cb",
	        plum: "dda0dd",
	        powderblue: "b0e0e6",
	        purple: "800080",
	        red: "ff0000",
	        rosybrown: "bc8f8f",
	        royalblue: "4169e1",
	        saddlebrown: "8b4513",
	        salmon: "fa8072",
	        sandybrown: "f4a460",
	        seagreen: "2e8b57",
	        seashell: "fff5ee",
	        sienna: "a0522d",
	        silver: "c0c0c0",
	        skyblue: "87ceeb",
	        slateblue: "6a5acd",
	        slategray: "708090",
	        snow: "fffafa",
	        springgreen: "00ff7f",
	        steelblue: "4682b4",
	        tan: "d2b48c",
	        teal: "008080",
	        thistle: "d8bfd8",
	        tomato: "ff6347",
	        turquoise: "40e0d0",
	        violet: "ee82ee",
	        violetred: "d02090",
	        wheat: "f5deb3",
	        white: "ffffff",
	        whitesmoke: "f5f5f5",
	        yellow: "ffff00",
	        yellowgreen: "9acd32"
	      };

	    for (key in namedColors) {
	      if (color === key) {
	        namedColor = namedColors[ key ];
	      }
	    }

	    return namedColor;
	  };
	  return color2color;
	})();
	module.exports = color2color;


/***/ }
/******/ ])
});
;
