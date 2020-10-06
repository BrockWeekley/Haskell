"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("../utils");
class CREditorControl {
    constructor(editor, pluginManager) {
        this.editor = editor;
        this.updateResults = () => {
            const path = this.editor.getPath();
            const resultsToMark = Array.from(this.resultsDB.filter((m) => m.uri === path && m.isValid()));
            const currentMarkers = this.markers.getMarkers();
            const newResults = resultsToMark.filter((r) => currentMarkers.every((m) => this.markerProps.get(m) !== r));
            const markersToDelete = currentMarkers.filter((m) => !resultsToMark.includes(this.markerProps.get(m)));
            markersToDelete.forEach((m) => m.destroy());
            for (const r of newResults) {
                this.markerFromCheckResult(r);
            }
        };
        const gutter = this.editor.gutterWithName('ide-haskell-check-results');
        if (gutter) {
            this.gutter = gutter;
        }
        else {
            this.gutter = this.editor.addGutter({
                name: 'ide-haskell-check-results',
                priority: 10,
            });
        }
        this.gutterElement = atom.views.getView(this.gutter);
        this.resultsDB = pluginManager.resultsDB;
        this.tooltipRegistry = pluginManager.tooltipRegistry;
        this.disposables = new atom_1.CompositeDisposable();
        this.markers = editor.addMarkerLayer({
            maintainHistory: true,
            persistent: false,
        });
        this.markerProps = new WeakMap();
        this.disposables.add(this.resultsDB.onDidUpdate(this.updateResults));
        this.updateResults();
        this.registerGutterEvents();
    }
    static supportsGrammar(grammar) {
        return [
            'source.c2hs',
            'source.hsc2hs',
            'source.haskell',
            'text.tex.latex.haskell',
            'source.hsig',
        ].includes(grammar);
    }
    destroy() {
        this.markers.destroy();
        this.disposables.dispose();
        try {
            this.gutter.destroy();
        }
        catch (e) {
            console.warn(e);
        }
    }
    getMessageAt(pos, type) {
        const markers = this.find(pos, type);
        const result = [];
        for (const marker of markers) {
            if (!marker.isValid()) {
                continue;
            }
            const res = this.markerProps.get(marker);
            if (!res) {
                continue;
            }
            result.push(res.message);
        }
        return result;
    }
    registerGutterEvents() {
        this.disposables.add(utils_1.listen(this.gutterElement, 'mouseover', '.decoration', (e) => {
            const bufferPt = utils_1.bufferPositionFromMouseEvent(this.editor, e);
            if (bufferPt) {
                const msg = this.getMessageAt(bufferPt, 'gutter');
                if (msg.length > 0) {
                    this.tooltipRegistry.showTooltip(this.editor, "mouse", {
                        pluginName: 'builtin:check-results',
                        tooltip: {
                            text: msg,
                            range: new atom_1.Range(bufferPt, bufferPt),
                        },
                    });
                }
            }
        }));
        this.disposables.add(utils_1.listen(this.gutterElement, 'mouseout', '.decoration', () => this.tooltipRegistry.hideTooltip(this.editor, "mouse", 'builtin:check-results')));
    }
    markerFromCheckResult(resItem) {
        const { position } = resItem;
        if (!position) {
            return;
        }
        const range = new atom_1.Range(position, atom_1.Point.fromObject([position.row, position.column + 1]));
        const marker = this.markers.markBufferRange(range, { invalidate: 'inside' });
        this.markerProps.set(marker, resItem);
        const disp = new atom_1.CompositeDisposable();
        disp.add(marker.onDidDestroy(() => {
            this.markerProps.delete(marker);
            disp.dispose();
        }), marker.onDidChange(({ isValid }) => {
            resItem.setValid(isValid);
        }));
        this.decorateMarker(marker, resItem);
    }
    decorateMarker(m, r) {
        const cls = { class: `ide-haskell-${r.severity}` };
        this.gutter.decorateMarker(m, Object.assign({ type: 'line-number' }, cls));
        this.editor.decorateMarker(m, Object.assign({ type: 'highlight' }, cls));
    }
    find(pos, type) {
        switch (type) {
            case 'gutter':
                return this.markers.findMarkers({ startBufferRow: pos.row });
            case 'keyboard':
                return this.markers.findMarkers({ startBufferPosition: pos });
            case 'mouse':
                return this.markers.findMarkers({ containsBufferPosition: pos });
            default:
                throw new TypeError('Switch assertion failed');
        }
    }
}
exports.CREditorControl = CREditorControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9lZGl0b3ItY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQVFhO0FBTWIsb0NBQThFO0FBRzlFO0lBUUUsWUFBb0IsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBcUc5QixrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FDNUQsQ0FBQTtZQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDaEQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQzVDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUMzRCxDQUFBO1lBQ0QsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FDM0MsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUN6RCxDQUFBO1lBQ0QsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFF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RUFBRSxFQUFFLENBQUE7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBSSxJQUFJLEVBQUUsYUFBYSxJQUFLLEdBQUcsRUFBRyxDQUFBO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQUksSUFBSSxFQUFFLFdBQVcsSUFBSyxHQUFHLEVBQUcsQ0FBQTtJQUM5RCxDQUFDO0lBRU8sSUFBSSxDQUFDLEdBQVUsRUFBRSxJQUFnQztRQUN2RCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUM5RCxLQUFLLFVBQVU7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUMvRCxLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUNsRTtnQkFDRSxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFDbEQsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTFLRCwwQ0EwS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSYW5nZSxcbiAgVGV4dEVkaXRvcixcbiAgUG9pbnQsXG4gIENvbXBvc2l0ZURpc3Bvc2FibGUsXG4gIEd1dHRlcixcbiAgRGlzcGxheU1hcmtlcixcbiAgRGlzcGxheU1hcmtlckxheWVyLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgVEV2ZW50UmFuZ2VUeXBlID0gVVBJLlRFdmVudFJhbmdlVHlwZVxuXG5pbXBvcnQgeyBSZXN1bHRzREIsIFJlc3VsdEl0ZW0gfSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciwgSUVkaXRvckNvbnRyb2xsZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IGxpc3RlbiwgYnVmZmVyUG9zaXRpb25Gcm9tTW91c2VFdmVudCwgTWVzc2FnZU9iamVjdCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgVG9vbHRpcFJlZ2lzdHJ5IH0gZnJvbSAnLi4vdG9vbHRpcC1yZWdpc3RyeSdcblxuZXhwb3J0IGNsYXNzIENSRWRpdG9yQ29udHJvbCBpbXBsZW1lbnRzIElFZGl0b3JDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBndXR0ZXI6IEd1dHRlclxuICBwcml2YXRlIGd1dHRlckVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgbWFya2VyczogRGlzcGxheU1hcmtlckxheWVyXG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBtYXJrZXJQcm9wczogV2Vha01hcDxEaXNwbGF5TWFya2VyLCBSZXN1bHRJdGVtPlxuICBwcml2YXRlIHRvb2x0aXBSZWdpc3RyeTogVG9vbHRpcFJlZ2lzdHJ5XG4gIHByaXZhdGUgcmVzdWx0c0RCOiBSZXN1bHRzREJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlZGl0b3I6IFRleHRFZGl0b3IsIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCBndXR0ZXIgPSB0aGlzLmVkaXRvci5ndXR0ZXJXaXRoTmFtZSgnaWRlLWhhc2tlbGwtY2hlY2stcmVzdWx0cycpXG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgdGhpcy5ndXR0ZXIgPSBndXR0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ndXR0ZXIgPSB0aGlzLmVkaXRvci5hZGRHdXR0ZXIoe1xuICAgICAgICBuYW1lOiAnaWRlLWhhc2tlbGwtY2hlY2stcmVzdWx0cycsXG4gICAgICAgIHByaW9yaXR5OiAxMCxcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuZ3V0dGVyRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmd1dHRlcilcblxuICAgIHRoaXMucmVzdWx0c0RCID0gcGx1Z2luTWFuYWdlci5yZXN1bHRzREJcbiAgICB0aGlzLnRvb2x0aXBSZWdpc3RyeSA9IHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMubWFya2VycyA9IGVkaXRvci5hZGRNYXJrZXJMYXllcih7XG4gICAgICBtYWludGFpbkhpc3Rvcnk6IHRydWUsXG4gICAgICBwZXJzaXN0ZW50OiBmYWxzZSxcbiAgICB9KVxuICAgIHRoaXMubWFya2VyUHJvcHMgPSBuZXcgV2Vha01hcCgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5yZXN1bHRzREIub25EaWRVcGRhdGUodGhpcy51cGRhdGVSZXN1bHRzKSlcbiAgICB0aGlzLnVwZGF0ZVJlc3VsdHMoKVxuICAgIHRoaXMucmVnaXN0ZXJHdXR0ZXJFdmVudHMoKVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdXBwb3J0c0dyYW1tYXIoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzb3VyY2UuYzJocycsXG4gICAgICAvLyAnc291cmNlLmNhYmFsJyxcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMubWFya2Vycy5kZXN0cm95KClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRyeSB7XG4gICAgICB0aGlzLmd1dHRlci5kZXN0cm95KClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKGUpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldE1lc3NhZ2VBdChwb3M6IFBvaW50LCB0eXBlOiBURXZlbnRSYW5nZVR5cGUgfCAnZ3V0dGVyJykge1xuICAgIGNvbnN0IG1hcmtlcnMgPSB0aGlzLmZpbmQocG9zLCB0eXBlKVxuICAgIGNvbnN0IHJlc3VsdDogTWVzc2FnZU9iamVjdFtdID0gW11cbiAgICBmb3IgKGNvbnN0IG1hcmtlciBvZiBtYXJrZXJzKSB7XG4gICAgICBpZiAoIW1hcmtlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMubWFya2VyUHJvcHMuZ2V0KG1hcmtlcilcbiAgICAgIGlmICghcmVzKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChyZXMubWVzc2FnZSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3Rlckd1dHRlckV2ZW50cygpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGxpc3Rlbih0aGlzLmd1dHRlckVsZW1lbnQsICdtb3VzZW92ZXInLCAnLmRlY29yYXRpb24nLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBidWZmZXJQdCA9IGJ1ZmZlclBvc2l0aW9uRnJvbU1vdXNlRXZlbnQoXG4gICAgICAgICAgdGhpcy5lZGl0b3IsXG4gICAgICAgICAgZSBhcyBNb3VzZUV2ZW50LFxuICAgICAgICApXG4gICAgICAgIGlmIChidWZmZXJQdCkge1xuICAgICAgICAgIGNvbnN0IG1zZyA9IHRoaXMuZ2V0TWVzc2FnZUF0KGJ1ZmZlclB0LCAnZ3V0dGVyJylcbiAgICAgICAgICBpZiAobXNnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICAgICAgdGhpcy50b29sdGlwUmVnaXN0cnkuc2hvd1Rvb2x0aXAoXG4gICAgICAgICAgICAgIHRoaXMuZWRpdG9yLFxuICAgICAgICAgICAgICBURXZlbnRSYW5nZVR5cGUubW91c2UsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5OYW1lOiAnYnVpbHRpbjpjaGVjay1yZXN1bHRzJyxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBtc2csXG4gICAgICAgICAgICAgICAgICByYW5nZTogbmV3IFJhbmdlKGJ1ZmZlclB0LCBidWZmZXJQdCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGxpc3Rlbih0aGlzLmd1dHRlckVsZW1lbnQsICdtb3VzZW91dCcsICcuZGVjb3JhdGlvbicsICgpID0+XG4gICAgICAgIHRoaXMudG9vbHRpcFJlZ2lzdHJ5LmhpZGVUb29sdGlwKFxuICAgICAgICAgIHRoaXMuZWRpdG9yLFxuICAgICAgICAgIFRFdmVudFJhbmdlVHlwZS5tb3VzZSxcbiAgICAgICAgICAnYnVpbHRpbjpjaGVjay1yZXN1bHRzJyxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSZXN1bHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmVkaXRvci5nZXRQYXRoKClcbiAgICBjb25zdCByZXN1bHRzVG9NYXJrID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMucmVzdWx0c0RCLmZpbHRlcigobSkgPT4gbS51cmkgPT09IHBhdGggJiYgbS5pc1ZhbGlkKCkpLFxuICAgIClcbiAgICBjb25zdCBjdXJyZW50TWFya2VycyA9IHRoaXMubWFya2Vycy5nZXRNYXJrZXJzKClcbiAgICBjb25zdCBuZXdSZXN1bHRzID0gcmVzdWx0c1RvTWFyay5maWx0ZXIoKHIpID0+XG4gICAgICBjdXJyZW50TWFya2Vycy5ldmVyeSgobSkgPT4gdGhpcy5tYXJrZXJQcm9wcy5nZXQobSkgIT09IHIpLFxuICAgIClcbiAgICBjb25zdCBtYXJrZXJzVG9EZWxldGUgPSBjdXJyZW50TWFya2Vycy5maWx0ZXIoXG4gICAgICAobSkgPT4gIXJlc3VsdHNUb01hcmsuaW5jbHVkZXModGhpcy5tYXJrZXJQcm9wcy5nZXQobSkhKSxcbiAgICApXG4gICAgbWFya2Vyc1RvRGVsZXRlLmZvckVhY2goKG0pID0+IG0uZGVzdHJveSgpKVxuICAgIGZvciAoY29uc3QgciBvZiBuZXdSZXN1bHRzKSB7XG4gICAgICB0aGlzLm1hcmtlckZyb21DaGVja1Jlc3VsdChyKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWFya2VyRnJvbUNoZWNrUmVzdWx0KHJlc0l0ZW06IFJlc3VsdEl0ZW0pIHtcbiAgICBjb25zdCB7IHBvc2l0aW9uIH0gPSByZXNJdGVtXG4gICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmFuZ2UgPSBuZXcgUmFuZ2UoXG4gICAgICBwb3NpdGlvbixcbiAgICAgIFBvaW50LmZyb21PYmplY3QoW3Bvc2l0aW9uLnJvdywgcG9zaXRpb24uY29sdW1uICsgMV0pLFxuICAgIClcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLm1hcmtlcnMubWFya0J1ZmZlclJhbmdlKHJhbmdlLCB7IGludmFsaWRhdGU6ICdpbnNpZGUnIH0pXG4gICAgdGhpcy5tYXJrZXJQcm9wcy5zZXQobWFya2VyLCByZXNJdGVtKVxuICAgIGNvbnN0IGRpc3AgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgZGlzcC5hZGQoXG4gICAgICBtYXJrZXIub25EaWREZXN0cm95KCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXJrZXJQcm9wcy5kZWxldGUobWFya2VyKVxuICAgICAgICBkaXNwLmRpc3Bvc2UoKVxuICAgICAgfSksXG4gICAgICBtYXJrZXIub25EaWRDaGFuZ2UoKHsgaXNWYWxpZCB9OiB7IGlzVmFsaWQ6IGJvb2xlYW4gfSkgPT4ge1xuICAgICAgICByZXNJdGVtLnNldFZhbGlkKGlzVmFsaWQpXG4gICAgICB9KSxcbiAgICApXG4gICAgdGhpcy5kZWNvcmF0ZU1hcmtlcihtYXJrZXIsIHJlc0l0ZW0pXG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlTWFya2VyKG06IERpc3BsYXlNYXJrZXIsIHI6IFJlc3VsdEl0ZW0pIHtcbiAgICBjb25zdCBjbHMgPSB7IGNsYXNzOiBgaWRlLWhhc2tlbGwtJHtyLnNldmVyaXR5fWAgfVxuICAgIHRoaXMuZ3V0dGVyLmRlY29yYXRlTWFya2VyKG0sIHsgdHlwZTogJ2xpbmUtbnVtYmVyJywgLi4uY2xzIH0pXG4gICAgdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIobSwgeyB0eXBlOiAnaGlnaGxpZ2h0JywgLi4uY2xzIH0pXG4gIH1cblxuICBwcml2YXRlIGZpbmQocG9zOiBQb2ludCwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlIHwgJ2d1dHRlcicpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2d1dHRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlcnMuZmluZE1hcmtlcnMoeyBzdGFydEJ1ZmZlclJvdzogcG9zLnJvdyB9KVxuICAgICAgY2FzZSAna2V5Ym9hcmQnOlxuICAgICAgICByZXR1cm4gdGhpcy5tYXJrZXJzLmZpbmRNYXJrZXJzKHsgc3RhcnRCdWZmZXJQb3NpdGlvbjogcG9zIH0pXG4gICAgICBjYXNlICdtb3VzZSc6XG4gICAgICAgIHJldHVybiB0aGlzLm1hcmtlcnMuZmluZE1hcmtlcnMoeyBjb250YWluc0J1ZmZlclBvc2l0aW9uOiBwb3MgfSlcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N3aXRjaCBhc3NlcnRpb24gZmFpbGVkJylcbiAgICB9XG4gIH1cbn1cbiJdfQ==