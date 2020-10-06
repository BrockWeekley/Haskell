"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ghcVerProps = {
    pathExclusive: {
        title: 'Replace PATH (rather than append to it)',
        type: 'boolean',
        default: false,
        order: 10,
    },
    pathTo: {
        type: 'array',
        title: 'PATH; comma-separated',
        default: [],
        order: 20,
    },
    sandbox: {
        type: 'string',
        title: 'Sandbox configuration file',
        default: '',
        order: 30,
    },
    buildDir: {
        type: 'string',
        title: 'Build directory',
        default: 'dist',
        order: 40,
    },
};
const ghcVersList = [
    '8.10',
    '8.8',
    '8.6',
    '8.4',
    '8.2',
    '8.0',
    '7.10',
    '7.8',
    '7.6',
    '7.4',
    '7.2',
];
const ghcVersProps = {};
let orderStart = 100;
for (const vers of ghcVersList) {
    const [maj, min] = vers.split('.');
    const key = `ghc${maj}${min.length === 1 ? `0${min}` : min}`;
    ghcVersProps[key] = {
        type: 'object',
        title: `GHC ${vers}`,
        properties: ghcVerProps,
        order: orderStart,
    };
    orderStart += 10;
}
exports.config = {
    stack: {
        type: 'object',
        properties: {
            globalArguments: {
                type: 'array',
                description: 'Global stack arguments (comma-separated)',
                default: [],
                order: 10,
            },
            buildArguments: {
                type: 'array',
                description: 'Stack build command arguments (comma-separated)',
                default: [],
                order: 20,
            },
            testArguments: {
                type: 'array',
                description: 'Stack test command arguments (comma-separated)',
                default: [],
                order: 30,
            },
            benchArguments: {
                type: 'array',
                description: 'Stack bench command arguments (comma-separated)',
                default: [],
                order: 30,
            },
            cleanArguments: {
                type: 'array',
                description: 'Stack clean command arguments (comma-separated)',
                default: [],
                order: 40,
            },
            depsArguments: {
                type: 'array',
                description: 'Stack install --only-dependencies command arguments (comma-separated)',
                default: [],
                order: 50,
            },
        },
    },
    cabal: {
        type: 'object',
        properties: Object.assign({ ignoreNoSandbox: {
                type: 'boolean',
                title: 'Install dependencies with no sandbox',
                description: 'Installing dependencies with no project sandbox is not ' +
                    'recommended, but you can do it if you enable this option',
                default: false,
                order: 1000,
            }, runHpack: {
                type: 'boolean',
                title: 'Run hpack before cabal',
                description: 'When package.yaml is detected in the same directory as ' +
                    'the cabal file, run hpack first',
                default: false,
                order: 10,
            }, activeGhcVersion: {
                type: 'string',
                title: 'Active GHC version',
                default: '8.6',
                enum: ghcVersList,
                order: 99,
            } }, ghcVersProps),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLGFBQWEsRUFBRTtRQUNiLEtBQUssRUFBRSx5Q0FBeUM7UUFDaEQsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFFRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsT0FBTyxFQUFFLEVBQUU7UUFDWCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBRUQsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsNEJBQTRCO1FBQ25DLE9BQU8sRUFBRSxFQUFFO1FBQ1gsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUVELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUc7SUFDbEIsTUFBTTtJQUNOLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7Q0FDTixDQUFBO0FBQ0QsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFBO0FBQ3ZCLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQTtBQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTtJQUM5QixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQzVELFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRztRQUNsQixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxPQUFPLElBQUksRUFBRTtRQUNwQixVQUFVLEVBQUUsV0FBVztRQUN2QixLQUFLLEVBQUUsVUFBVTtLQUNsQixDQUFBO0lBQ0QsVUFBVSxJQUFJLEVBQUUsQ0FBQTtDQUNqQjtBQUVZLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsVUFBVSxFQUFFO1lBQ1YsZUFBZSxFQUFFO2dCQUNmLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxLQUFLLEVBQUUsRUFBRTthQUNWO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxFQUFFO2FBQ1Y7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGFBQWEsRUFBRTtnQkFDYixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQ1QsdUVBQXVFO2dCQUN6RSxPQUFPLEVBQUUsRUFBRTtnQkFDWCxLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsVUFBVSxrQkFDUixlQUFlLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLHNDQUFzQztnQkFDN0MsV0FBVyxFQUNULHlEQUF5RDtvQkFDekQsMERBQTBEO2dCQUM1RCxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsSUFBSTthQUNaLEVBQ0QsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSx3QkFBd0I7Z0JBQy9CLFdBQVcsRUFDVCx5REFBeUQ7b0JBQ3pELGlDQUFpQztnQkFDbkMsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVixFQUNELGdCQUFnQixFQUFFO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixPQUFPLEVBQUUsS0FBSztnQkFDZCxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEVBQUU7YUFDVixJQUNFLFlBQVksQ0FDaEI7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnaGNWZXJQcm9wcyA9IHtcbiAgcGF0aEV4Y2x1c2l2ZToge1xuICAgIHRpdGxlOiAnUmVwbGFjZSBQQVRIIChyYXRoZXIgdGhhbiBhcHBlbmQgdG8gaXQpJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgb3JkZXI6IDEwLFxuICB9LFxuXG4gIHBhdGhUbzoge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgdGl0bGU6ICdQQVRIOyBjb21tYS1zZXBhcmF0ZWQnLFxuICAgIGRlZmF1bHQ6IFtdLFxuICAgIG9yZGVyOiAyMCxcbiAgfSxcblxuICBzYW5kYm94OiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgdGl0bGU6ICdTYW5kYm94IGNvbmZpZ3VyYXRpb24gZmlsZScsXG4gICAgZGVmYXVsdDogJycsXG4gICAgb3JkZXI6IDMwLFxuICB9LFxuXG4gIGJ1aWxkRGlyOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgdGl0bGU6ICdCdWlsZCBkaXJlY3RvcnknLFxuICAgIGRlZmF1bHQ6ICdkaXN0JyxcbiAgICBvcmRlcjogNDAsXG4gIH0sXG59XG5cbmNvbnN0IGdoY1ZlcnNMaXN0ID0gW1xuICAnOC4xMCcsXG4gICc4LjgnLFxuICAnOC42JyxcbiAgJzguNCcsXG4gICc4LjInLFxuICAnOC4wJyxcbiAgJzcuMTAnLFxuICAnNy44JyxcbiAgJzcuNicsXG4gICc3LjQnLFxuICAnNy4yJyxcbl1cbmNvbnN0IGdoY1ZlcnNQcm9wcyA9IHt9XG5sZXQgb3JkZXJTdGFydCA9IDEwMFxuZm9yIChjb25zdCB2ZXJzIG9mIGdoY1ZlcnNMaXN0KSB7XG4gIGNvbnN0IFttYWosIG1pbl0gPSB2ZXJzLnNwbGl0KCcuJylcbiAgY29uc3Qga2V5ID0gYGdoYyR7bWFqfSR7bWluLmxlbmd0aCA9PT0gMSA/IGAwJHttaW59YCA6IG1pbn1gXG4gIGdoY1ZlcnNQcm9wc1trZXldID0ge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiBgR0hDICR7dmVyc31gLFxuICAgIHByb3BlcnRpZXM6IGdoY1ZlclByb3BzLFxuICAgIG9yZGVyOiBvcmRlclN0YXJ0LFxuICB9XG4gIG9yZGVyU3RhcnQgKz0gMTBcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgc3RhY2s6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBnbG9iYWxBcmd1bWVudHM6IHtcbiAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdHbG9iYWwgc3RhY2sgYXJndW1lbnRzIChjb21tYS1zZXBhcmF0ZWQpJyxcbiAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgIG9yZGVyOiAxMCxcbiAgICAgIH0sXG4gICAgICBidWlsZEFyZ3VtZW50czoge1xuICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1N0YWNrIGJ1aWxkIGNvbW1hbmQgYXJndW1lbnRzIChjb21tYS1zZXBhcmF0ZWQpJyxcbiAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgIG9yZGVyOiAyMCxcbiAgICAgIH0sXG4gICAgICB0ZXN0QXJndW1lbnRzOiB7XG4gICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU3RhY2sgdGVzdCBjb21tYW5kIGFyZ3VtZW50cyAoY29tbWEtc2VwYXJhdGVkKScsXG4gICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICBvcmRlcjogMzAsXG4gICAgICB9LFxuICAgICAgYmVuY2hBcmd1bWVudHM6IHtcbiAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTdGFjayBiZW5jaCBjb21tYW5kIGFyZ3VtZW50cyAoY29tbWEtc2VwYXJhdGVkKScsXG4gICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICBvcmRlcjogMzAsXG4gICAgICB9LFxuICAgICAgY2xlYW5Bcmd1bWVudHM6IHtcbiAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTdGFjayBjbGVhbiBjb21tYW5kIGFyZ3VtZW50cyAoY29tbWEtc2VwYXJhdGVkKScsXG4gICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICBvcmRlcjogNDAsXG4gICAgICB9LFxuICAgICAgZGVwc0FyZ3VtZW50czoge1xuICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnU3RhY2sgaW5zdGFsbCAtLW9ubHktZGVwZW5kZW5jaWVzIGNvbW1hbmQgYXJndW1lbnRzIChjb21tYS1zZXBhcmF0ZWQpJyxcbiAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgIG9yZGVyOiA1MCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgY2FiYWw6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBpZ25vcmVOb1NhbmRib3g6IHtcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICB0aXRsZTogJ0luc3RhbGwgZGVwZW5kZW5jaWVzIHdpdGggbm8gc2FuZGJveCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdJbnN0YWxsaW5nIGRlcGVuZGVuY2llcyB3aXRoIG5vIHByb2plY3Qgc2FuZGJveCBpcyBub3QgJyArXG4gICAgICAgICAgJ3JlY29tbWVuZGVkLCBidXQgeW91IGNhbiBkbyBpdCBpZiB5b3UgZW5hYmxlIHRoaXMgb3B0aW9uJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiAxMDAwLFxuICAgICAgfSxcbiAgICAgIHJ1bkhwYWNrOiB7XG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgdGl0bGU6ICdSdW4gaHBhY2sgYmVmb3JlIGNhYmFsJyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ1doZW4gcGFja2FnZS55YW1sIGlzIGRldGVjdGVkIGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyAnICtcbiAgICAgICAgICAndGhlIGNhYmFsIGZpbGUsIHJ1biBocGFjayBmaXJzdCcsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogMTAsXG4gICAgICB9LFxuICAgICAgYWN0aXZlR2hjVmVyc2lvbjoge1xuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgdGl0bGU6ICdBY3RpdmUgR0hDIHZlcnNpb24nLFxuICAgICAgICBkZWZhdWx0OiAnOC42JyxcbiAgICAgICAgZW51bTogZ2hjVmVyc0xpc3QsXG4gICAgICAgIG9yZGVyOiA5OSxcbiAgICAgIH0sXG4gICAgICAuLi5naGNWZXJzUHJvcHMsXG4gICAgfSxcbiAgfSxcbn1cblxuLy8gZ2VuZXJhdGVkIGJ5IHR5cGVkLWNvbmZpZy5qc1xuZGVjbGFyZSBtb2R1bGUgJ2F0b20nIHtcbiAgaW50ZXJmYWNlIENvbmZpZ1ZhbHVlcyB7XG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLnN0YWNrLmdsb2JhbEFyZ3VtZW50cyc6IGFueVtdXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLnN0YWNrLmJ1aWxkQXJndW1lbnRzJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuc3RhY2sudGVzdEFyZ3VtZW50cyc6IGFueVtdXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLnN0YWNrLmJlbmNoQXJndW1lbnRzJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuc3RhY2suY2xlYW5Bcmd1bWVudHMnOiBhbnlbXVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5zdGFjay5kZXBzQXJndW1lbnRzJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuc3RhY2snOiB7XG4gICAgICBnbG9iYWxBcmd1bWVudHM6IGFueVtdXG4gICAgICBidWlsZEFyZ3VtZW50czogYW55W11cbiAgICAgIHRlc3RBcmd1bWVudHM6IGFueVtdXG4gICAgICBiZW5jaEFyZ3VtZW50czogYW55W11cbiAgICAgIGNsZWFuQXJndW1lbnRzOiBhbnlbXVxuICAgICAgZGVwc0FyZ3VtZW50czogYW55W11cbiAgICB9XG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmlnbm9yZU5vU2FuZGJveCc6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwucnVuSHBhY2snOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmFjdGl2ZUdoY1ZlcnNpb24nOlxuICAgICAgfCAnNy4yJ1xuICAgICAgfCAnNy40J1xuICAgICAgfCAnNy42J1xuICAgICAgfCAnNy44J1xuICAgICAgfCAnNy4xMCdcbiAgICAgIHwgJzguMCdcbiAgICAgIHwgJzguMidcbiAgICAgIHwgJzguNCdcbiAgICAgIHwgJzguNidcbiAgICAgIHwgJzguOCdcbiAgICAgIHwgJzguMTAnXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwMi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDIucGF0aFRvJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzAyLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwMic6IHtcbiAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgIHBhdGhUbzogYW55W11cbiAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgIH1cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzA0LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwNC5wYXRoVG8nOiBhbnlbXVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDQuc2FuZGJveCc6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDQuYnVpbGREaXInOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzA0Jzoge1xuICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgfVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDYucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzA2LnBhdGhUbyc6IGFueVtdXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwNi5idWlsZERpcic6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDYnOiB7XG4gICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICBwYXRoVG86IGFueVtdXG4gICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICB9XG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwOC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MDgucGF0aFRvJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzA4LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcwOCc6IHtcbiAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgIHBhdGhUbzogYW55W11cbiAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgIH1cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzEwLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzcxMC5wYXRoVG8nOiBhbnlbXVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MTAuc2FuZGJveCc6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM3MTAuYnVpbGREaXInOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjNzEwJzoge1xuICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgfVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODAwLnBhdGhUbyc6IGFueVtdXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwMC5zYW5kYm94Jzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwMC5idWlsZERpcic6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDAnOiB7XG4gICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICBwYXRoVG86IGFueVtdXG4gICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICB9XG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwMi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDIucGF0aFRvJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODAyLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwMic6IHtcbiAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgIHBhdGhUbzogYW55W11cbiAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgIH1cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODA0LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwNC5wYXRoVG8nOiBhbnlbXVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDQuc2FuZGJveCc6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDQuYnVpbGREaXInOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODA0Jzoge1xuICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgfVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDYucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODA2LnBhdGhUbyc6IGFueVtdXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwNi5idWlsZERpcic6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDYnOiB7XG4gICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICBwYXRoVG86IGFueVtdXG4gICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICB9XG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwOC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MDgucGF0aFRvJzogYW55W11cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODA4LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgwOCc6IHtcbiAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgIHBhdGhUbzogYW55W11cbiAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgIH1cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODEwLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgJ2lkZS1oYXNrZWxsLWNhYmFsLmNhYmFsLmdoYzgxMC5wYXRoVG8nOiBhbnlbXVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MTAuc2FuZGJveCc6IHN0cmluZ1xuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbC5naGM4MTAuYnVpbGREaXInOiBzdHJpbmdcbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwuY2FiYWwuZ2hjODEwJzoge1xuICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgfVxuICAgICdpZGUtaGFza2VsbC1jYWJhbC5jYWJhbCc6IHtcbiAgICAgIGlnbm9yZU5vU2FuZGJveDogYm9vbGVhblxuICAgICAgcnVuSHBhY2s6IGJvb2xlYW5cbiAgICAgIGFjdGl2ZUdoY1ZlcnNpb246XG4gICAgICAgIHwgJzcuMidcbiAgICAgICAgfCAnNy40J1xuICAgICAgICB8ICc3LjYnXG4gICAgICAgIHwgJzcuOCdcbiAgICAgICAgfCAnNy4xMCdcbiAgICAgICAgfCAnOC4wJ1xuICAgICAgICB8ICc4LjInXG4gICAgICAgIHwgJzguNCdcbiAgICAgICAgfCAnOC42J1xuICAgICAgICB8ICc4LjgnXG4gICAgICAgIHwgJzguMTAnXG4gICAgICAnZ2hjNzAyLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnZ2hjNzAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAnZ2hjNzAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdnaGM3MDIuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgIGdoYzcwMjoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdnaGM3MDQucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdnaGM3MDQucGF0aFRvJzogYW55W11cbiAgICAgICdnaGM3MDQuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2doYzcwNC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgZ2hjNzA0OiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2doYzcwNi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2doYzcwNi5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2doYzcwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnZ2hjNzA2LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICBnaGM3MDY6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnZ2hjNzA4LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnZ2hjNzA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAnZ2hjNzA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdnaGM3MDguYnVpbGREaXInOiBzdHJpbmdcbiAgICAgIGdoYzcwODoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdnaGM3MTAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdnaGM3MTAucGF0aFRvJzogYW55W11cbiAgICAgICdnaGM3MTAuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2doYzcxMC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgZ2hjNzEwOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2doYzgwMC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2doYzgwMC5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2doYzgwMC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnZ2hjODAwLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICBnaGM4MDA6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnZ2hjODAyLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnZ2hjODAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAnZ2hjODAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdnaGM4MDIuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgIGdoYzgwMjoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdnaGM4MDQucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdnaGM4MDQucGF0aFRvJzogYW55W11cbiAgICAgICdnaGM4MDQuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2doYzgwNC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgZ2hjODA0OiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2doYzgwNi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2doYzgwNi5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2doYzgwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnZ2hjODA2LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICBnaGM4MDY6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnZ2hjODA4LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnZ2hjODA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAnZ2hjODA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdnaGM4MDguYnVpbGREaXInOiBzdHJpbmdcbiAgICAgIGdoYzgwODoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdnaGM4MTAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdnaGM4MTAucGF0aFRvJzogYW55W11cbiAgICAgICdnaGM4MTAuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2doYzgxMC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgZ2hjODEwOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgIH1cbiAgICAnaWRlLWhhc2tlbGwtY2FiYWwnOiB7XG4gICAgICAnc3RhY2suZ2xvYmFsQXJndW1lbnRzJzogYW55W11cbiAgICAgICdzdGFjay5idWlsZEFyZ3VtZW50cyc6IGFueVtdXG4gICAgICAnc3RhY2sudGVzdEFyZ3VtZW50cyc6IGFueVtdXG4gICAgICAnc3RhY2suYmVuY2hBcmd1bWVudHMnOiBhbnlbXVxuICAgICAgJ3N0YWNrLmNsZWFuQXJndW1lbnRzJzogYW55W11cbiAgICAgICdzdGFjay5kZXBzQXJndW1lbnRzJzogYW55W11cbiAgICAgIHN0YWNrOiB7XG4gICAgICAgIGdsb2JhbEFyZ3VtZW50czogYW55W11cbiAgICAgICAgYnVpbGRBcmd1bWVudHM6IGFueVtdXG4gICAgICAgIHRlc3RBcmd1bWVudHM6IGFueVtdXG4gICAgICAgIGJlbmNoQXJndW1lbnRzOiBhbnlbXVxuICAgICAgICBjbGVhbkFyZ3VtZW50czogYW55W11cbiAgICAgICAgZGVwc0FyZ3VtZW50czogYW55W11cbiAgICAgIH1cbiAgICAgICdjYWJhbC5pZ25vcmVOb1NhbmRib3gnOiBib29sZWFuXG4gICAgICAnY2FiYWwucnVuSHBhY2snOiBib29sZWFuXG4gICAgICAnY2FiYWwuYWN0aXZlR2hjVmVyc2lvbic6XG4gICAgICAgIHwgJzcuMidcbiAgICAgICAgfCAnNy40J1xuICAgICAgICB8ICc3LjYnXG4gICAgICAgIHwgJzcuOCdcbiAgICAgICAgfCAnNy4xMCdcbiAgICAgICAgfCAnOC4wJ1xuICAgICAgICB8ICc4LjInXG4gICAgICAgIHwgJzguNCdcbiAgICAgICAgfCAnOC42J1xuICAgICAgICB8ICc4LjgnXG4gICAgICAgIHwgJzguMTAnXG4gICAgICAnY2FiYWwuZ2hjNzAyLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnY2FiYWwuZ2hjNzAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAnY2FiYWwuZ2hjNzAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM3MDIuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM3MDInOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2NhYmFsLmdoYzcwNC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2NhYmFsLmdoYzcwNC5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2NhYmFsLmdoYzcwNC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjNzA0LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjNzA0Jzoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdjYWJhbC5naGM3MDYucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdjYWJhbC5naGM3MDYucGF0aFRvJzogYW55W11cbiAgICAgICdjYWJhbC5naGM3MDYuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzcwNi5idWlsZERpcic6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzcwNic6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnY2FiYWwuZ2hjNzA4LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnY2FiYWwuZ2hjNzA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAnY2FiYWwuZ2hjNzA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM3MDguYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM3MDgnOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2NhYmFsLmdoYzcxMC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2NhYmFsLmdoYzcxMC5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2NhYmFsLmdoYzcxMC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjNzEwLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjNzEwJzoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdjYWJhbC5naGM4MDAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdjYWJhbC5naGM4MDAucGF0aFRvJzogYW55W11cbiAgICAgICdjYWJhbC5naGM4MDAuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzgwMC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzgwMCc6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnY2FiYWwuZ2hjODAyLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnY2FiYWwuZ2hjODAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAnY2FiYWwuZ2hjODAyLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM4MDIuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM4MDInOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2NhYmFsLmdoYzgwNC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2NhYmFsLmdoYzgwNC5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2NhYmFsLmdoYzgwNC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjODA0LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjODA0Jzoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgICdjYWJhbC5naGM4MDYucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICdjYWJhbC5naGM4MDYucGF0aFRvJzogYW55W11cbiAgICAgICdjYWJhbC5naGM4MDYuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzgwNi5idWlsZERpcic6IHN0cmluZ1xuICAgICAgJ2NhYmFsLmdoYzgwNic6IHtcbiAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICB9XG4gICAgICAnY2FiYWwuZ2hjODA4LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAnY2FiYWwuZ2hjODA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAnY2FiYWwuZ2hjODA4LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM4MDguYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICdjYWJhbC5naGM4MDgnOiB7XG4gICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgfVxuICAgICAgJ2NhYmFsLmdoYzgxMC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgJ2NhYmFsLmdoYzgxMC5wYXRoVG8nOiBhbnlbXVxuICAgICAgJ2NhYmFsLmdoYzgxMC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjODEwLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAnY2FiYWwuZ2hjODEwJzoge1xuICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgIH1cbiAgICAgIGNhYmFsOiB7XG4gICAgICAgIGlnbm9yZU5vU2FuZGJveDogYm9vbGVhblxuICAgICAgICBydW5IcGFjazogYm9vbGVhblxuICAgICAgICBhY3RpdmVHaGNWZXJzaW9uOlxuICAgICAgICAgIHwgJzcuMidcbiAgICAgICAgICB8ICc3LjQnXG4gICAgICAgICAgfCAnNy42J1xuICAgICAgICAgIHwgJzcuOCdcbiAgICAgICAgICB8ICc3LjEwJ1xuICAgICAgICAgIHwgJzguMCdcbiAgICAgICAgICB8ICc4LjInXG4gICAgICAgICAgfCAnOC40J1xuICAgICAgICAgIHwgJzguNidcbiAgICAgICAgICB8ICc4LjgnXG4gICAgICAgICAgfCAnOC4xMCdcbiAgICAgICAgJ2doYzcwMi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgICAnZ2hjNzAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAgICdnaGM3MDIuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgICAnZ2hjNzAyLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAgIGdoYzcwMjoge1xuICAgICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgICdnaGM3MDQucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICAgJ2doYzcwNC5wYXRoVG8nOiBhbnlbXVxuICAgICAgICAnZ2hjNzA0LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICAgJ2doYzcwNC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgICBnaGM3MDQ6IHtcbiAgICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgICAgfVxuICAgICAgICAnZ2hjNzA2LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAgICdnaGM3MDYucGF0aFRvJzogYW55W11cbiAgICAgICAgJ2doYzcwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAgICdnaGM3MDYuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICAgZ2hjNzA2OiB7XG4gICAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgJ2doYzcwOC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgICAnZ2hjNzA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAgICdnaGM3MDguc2FuZGJveCc6IHN0cmluZ1xuICAgICAgICAnZ2hjNzA4LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAgIGdoYzcwODoge1xuICAgICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgICdnaGM3MTAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICAgJ2doYzcxMC5wYXRoVG8nOiBhbnlbXVxuICAgICAgICAnZ2hjNzEwLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICAgJ2doYzcxMC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgICBnaGM3MTA6IHtcbiAgICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgICAgfVxuICAgICAgICAnZ2hjODAwLnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAgICdnaGM4MDAucGF0aFRvJzogYW55W11cbiAgICAgICAgJ2doYzgwMC5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAgICdnaGM4MDAuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICAgZ2hjODAwOiB7XG4gICAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgJ2doYzgwMi5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgICAnZ2hjODAyLnBhdGhUbyc6IGFueVtdXG4gICAgICAgICdnaGM4MDIuc2FuZGJveCc6IHN0cmluZ1xuICAgICAgICAnZ2hjODAyLmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAgIGdoYzgwMjoge1xuICAgICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgICdnaGM4MDQucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICAgJ2doYzgwNC5wYXRoVG8nOiBhbnlbXVxuICAgICAgICAnZ2hjODA0LnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICAgJ2doYzgwNC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgICBnaGM4MDQ6IHtcbiAgICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgICAgfVxuICAgICAgICAnZ2hjODA2LnBhdGhFeGNsdXNpdmUnOiBib29sZWFuXG4gICAgICAgICdnaGM4MDYucGF0aFRvJzogYW55W11cbiAgICAgICAgJ2doYzgwNi5zYW5kYm94Jzogc3RyaW5nXG4gICAgICAgICdnaGM4MDYuYnVpbGREaXInOiBzdHJpbmdcbiAgICAgICAgZ2hjODA2OiB7XG4gICAgICAgICAgcGF0aEV4Y2x1c2l2ZTogYm9vbGVhblxuICAgICAgICAgIHBhdGhUbzogYW55W11cbiAgICAgICAgICBzYW5kYm94OiBzdHJpbmdcbiAgICAgICAgICBidWlsZERpcjogc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgJ2doYzgwOC5wYXRoRXhjbHVzaXZlJzogYm9vbGVhblxuICAgICAgICAnZ2hjODA4LnBhdGhUbyc6IGFueVtdXG4gICAgICAgICdnaGM4MDguc2FuZGJveCc6IHN0cmluZ1xuICAgICAgICAnZ2hjODA4LmJ1aWxkRGlyJzogc3RyaW5nXG4gICAgICAgIGdoYzgwODoge1xuICAgICAgICAgIHBhdGhFeGNsdXNpdmU6IGJvb2xlYW5cbiAgICAgICAgICBwYXRoVG86IGFueVtdXG4gICAgICAgICAgc2FuZGJveDogc3RyaW5nXG4gICAgICAgICAgYnVpbGREaXI6IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgICdnaGM4MTAucGF0aEV4Y2x1c2l2ZSc6IGJvb2xlYW5cbiAgICAgICAgJ2doYzgxMC5wYXRoVG8nOiBhbnlbXVxuICAgICAgICAnZ2hjODEwLnNhbmRib3gnOiBzdHJpbmdcbiAgICAgICAgJ2doYzgxMC5idWlsZERpcic6IHN0cmluZ1xuICAgICAgICBnaGM4MTA6IHtcbiAgICAgICAgICBwYXRoRXhjbHVzaXZlOiBib29sZWFuXG4gICAgICAgICAgcGF0aFRvOiBhbnlbXVxuICAgICAgICAgIHNhbmRib3g6IHN0cmluZ1xuICAgICAgICAgIGJ1aWxkRGlyOiBzdHJpbmdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19