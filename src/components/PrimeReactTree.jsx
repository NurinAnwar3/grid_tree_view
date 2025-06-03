
import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { NodeService } from './../data/NodeService';
import { Button } from 'primereact/button';

export default function DragDropDemo() {
    const [nodes, setNodes] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState({'0': true, '0-0': true});
    const [selectedKeys, setSelectedKeys] = useState(null);

    const expandAll = () => {
        let _expandedKeys = {};

        for (let node of nodes) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="flex flex-column align-items-center">
            <div className="flex flex-wrap gap-2 m-4">
                <Button type="button" icon="pi pi-plus" label="Expand All" onClick={expandAll} />
                <Button type="button" icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
            </div>

            <Tree 
            value={nodes} 
            dragdropScope="demo" 
            onDragDrop={(e) => setNodes(e.value)} 
            filter filterMode="strict" 
            filterPlaceholder="Strict Filter"
            expandedKeys={expandedKeys} 
            onToggle={(e) => setExpandedKeys(e.value)}
            selectionMode="checkbox" 
            selectionKeys={selectedKeys} 
            onSelectionChange={(e) => setSelectedKeys(e.value)}
            className="w-full md:w-30rem" />
        </div>        
    )
}
        