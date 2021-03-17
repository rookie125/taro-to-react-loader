const t = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

module.exports = function(source) {
    const ast = parser.parse(source, {
        sourceType: 'module',
        plugins: [
            "jsx",
            "flow",
            "classProperties",
            "decorator",
            "decorators-legacy"
        ]
    });

    traverse(ast, {
        Program(path) {
            let len = 0;
            let count = path.node.body.length;
            let importDeclaration = [];
            let needReactDOM = false;

            while (len <  count) {
                const node = path.node.body[len];
                len++;

                if (!node || !node.type) continue;

                // imports
                if (t.isImportDeclaration(node)) {
                    importDeclaration = path.node.body;

                    const ImportDefaultSpecifier = node.specifiers.find(v => t.isImportDefaultSpecifier(v));

                    if (!ImportDefaultSpecifier) continue;

                    if (
                        t.isImportDefaultSpecifier(ImportDefaultSpecifier) &&
                        ImportDefaultSpecifier.local.name.match(/DOM$/i) &&
                        node.source.value === '@tarojs/taro'
                    ) {
                        node.source.value = 'react-dom';
                    } else if (
                        ImportDefaultSpecifier.local.name.match(/taro$/i) &&
                        node.source.value === '@tarojs/taro'
                    ) {
                        ImportDefaultSpecifier.local.name = 'React';
                        node.source.value = 'react';
                    }
                }

                // Taro.render => ReactDOM.render
                if (t.isExpressionStatement(node)) {
                    if (
                        t.isCallExpression(node.expression) &&
                        t.isMemberExpression(node.expression.callee) &&
                        node.expression.callee.object.name === 'Taro' &&
                        node.expression.callee.property.name === 'render'
                    ) {
                        node.expression.callee.object.name = 'ReactDOM';
                        needReactDOM = true;
                    }
                }
            }

            if (needReactDOM) {
                const _importDefaultSpecifier = [t.ImportDefaultSpecifier(t.Identifier('ReactDOM'))];
                const _importDeclaration = t.ImportDeclaration(_importDefaultSpecifier, t.StringLiteral('react-dom'));

                importDeclaration.unshift(_importDeclaration)
            }
        }
    });

    const { code } = generator(ast, {});

    return code;
}