"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const etch = require("etch");
class ParamControl {
    constructor(props) {
        this.props = props;
        this.tooltipTitle = () => {
            const displayName = this.props.spec.displayName !== undefined
                ? this.props.spec.displayName
                : 'Undefined name';
            if (this.hiddenValue) {
                return `${displayName}: ${this.props.spec.displayTemplate(this.value)}`;
            }
            else {
                return displayName;
            }
        };
        this.disposables = new atom_1.CompositeDisposable();
        this.hiddenValue = atom.config.get('ide-haskell.hideParameterValues');
        this.initStore();
        this.initSpec();
        etch.initialize(this);
        this.disposables.add(atom.config.onDidChange('ide-haskell.hideParameterValues', ({ newValue }) => {
            this.hiddenValue = newValue;
            this.update();
        }));
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle }));
    }
    render() {
        const classList = [
            `ide-haskell--${this.props.pluginName}`,
            `ide-haskell-param--${this.props.name}`,
        ];
        if (this.hiddenValue) {
            classList.push('hidden-value');
        }
        return (etch.dom("ide-haskell-param", { class: classList.join(' '), on: { click: async () => this.setValue() } },
            etch.dom("ide-haskell-param-value", null, this.props.spec.displayTemplate(this.value))));
    }
    async update(props) {
        if (props) {
            const { pluginName, name, spec, store } = props;
            if (pluginName !== undefined) {
                this.props.pluginName = pluginName;
            }
            if (name !== undefined) {
                this.props.name = name;
            }
            if (spec && this.props.spec !== spec) {
                this.props.spec = spec;
                this.initSpec();
            }
            if (store && this.props.store !== store) {
                this.props.store = store;
                this.initStore();
            }
        }
        return etch.update(this);
    }
    async setValue(e) {
        await this.props.store.setValue(this.props.pluginName, this.props.name, e);
        this.update();
    }
    async destroy() {
        await etch.destroy(this);
        this.disposables.dispose();
    }
    initStore() {
        if (this.storeDisposable) {
            this.disposables.remove(this.storeDisposable);
        }
        this.storeDisposable = this.props.store.onDidUpdate(this.props.pluginName, this.props.name, ({ value }) => {
            this.value = value;
            this.update();
        });
        this.disposables.add(this.storeDisposable);
        this.setValueInitial();
    }
    async setValueInitial() {
        this.value = await this.props.store.getValueRaw(this.props.pluginName, this.props.name);
        return this.update();
    }
    initSpec() {
        if (this.props.spec.displayName === undefined) {
            this.props.spec.displayName =
                this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
        }
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXNEO0FBQ3RELDZCQUE0QjtBQVk1QjtJQU1FLFlBQW1CLEtBQWdCO1FBQWhCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFnSDNCLGlCQUFZLEdBQUcsR0FBVyxFQUFFO1lBQ2xDLE1BQU0sV0FBVyxHQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTO2dCQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDN0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFBO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFBO1lBQ3pFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsV0FBVyxDQUFBO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUE7UUF6SEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFFNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBRXJFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFD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QUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0NBYUY7QUFqSUQsb0NBaUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuaW1wb3J0IHsgQ29uZmlnUGFyYW1TdG9yZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sPFQ+IGltcGxlbWVudHMgVVBJLklFbGVtZW50T2JqZWN0PElQcm9wczxUPj4ge1xuICBwdWJsaWMgZWxlbWVudCE6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBoaWRkZW5WYWx1ZTogYm9vbGVhblxuICBwcml2YXRlIHZhbHVlPzogVFxuICBwcml2YXRlIHN0b3JlRGlzcG9zYWJsZT86IERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHM8VD4pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5oaWRkZW5WYWx1ZSA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuaGlkZVBhcmFtZXRlclZhbHVlcycpXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShcbiAgICAgICAgJ2lkZS1oYXNrZWxsLmhpZGVQYXJhbWV0ZXJWYWx1ZXMnLFxuICAgICAgICAoeyBuZXdWYWx1ZSB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5oaWRkZW5WYWx1ZSA9IG5ld1ZhbHVlXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwgeyB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbXG4gICAgICBgaWRlLWhhc2tlbGwtLSR7dGhpcy5wcm9wcy5wbHVnaW5OYW1lfWAsXG4gICAgICBgaWRlLWhhc2tlbGwtcGFyYW0tLSR7dGhpcy5wcm9wcy5uYW1lfWAsXG4gICAgXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7XG4gICAgICBjbGFzc0xpc3QucHVzaCgnaGlkZGVuLXZhbHVlJylcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbVxuICAgICAgICBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX1cbiAgICAgICAgb249e3sgY2xpY2s6IGFzeW5jICgpID0+IHRoaXMuc2V0VmFsdWUoKSB9fVxuICAgICAgPlxuICAgICAgICA8aWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICAgICAge3RoaXMucHJvcHMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM/OiBQYXJ0aWFsPElQcm9wczxUPj4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgcGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmUgfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucHJvcHMucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWVcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5uYW1lID0gbmFtZVxuICAgICAgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5wcm9wcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5wcm9wcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUoZT86IFQpIHtcbiAgICBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLnNldFZhbHVlKHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCBlKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMucmVtb3ZlKHRoaXMuc3RvcmVEaXNwb3NhYmxlKVxuICAgIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9IHRoaXMucHJvcHMuc3RvcmUub25EaWRVcGRhdGU8VD4oXG4gICAgICB0aGlzLnByb3BzLnBsdWdpbk5hbWUsXG4gICAgICB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgfSxcbiAgICApXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgdGhpcy5zZXRWYWx1ZUluaXRpYWwoKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZXRWYWx1ZUluaXRpYWwoKSB7XG4gICAgdGhpcy52YWx1ZSA9IGF3YWl0IHRoaXMucHJvcHMuc3RvcmUuZ2V0VmFsdWVSYXc8VD4oXG4gICAgICB0aGlzLnByb3BzLnBsdWdpbk5hbWUsXG4gICAgICB0aGlzLnByb3BzLm5hbWUsXG4gICAgKVxuICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTcGVjKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lID1cbiAgICAgICAgdGhpcy5wcm9wcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5wcm9wcy5uYW1lLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgPSAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9XG4gICAgICB0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZVxuICAgICAgICA6ICdVbmRlZmluZWQgbmFtZSdcbiAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGAke2Rpc3BsYXlOYW1lfTogJHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRpc3BsYXlOYW1lXG4gICAgfVxuICB9XG59XG4iXX0=