"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { GridBackground } from "@/components/Effects";

export default function ComponentsDemoPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <GridBackground>
      <div className="container mx-auto py-24 space-y-16">
        <div className="text-center">
          <h1 className="text-display-md font-display">Component Playground</h1>
          <p className="text-body-lg text-neutral-400 mt-2">A showcase of the ANACONDA Design System.</p>
        </div>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-h3 font-display">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <Button variant="primary" size="lg">Primary LG</Button>
            <Button variant="secondary">Secondary MD</Button>
            <Button variant="ghost" size="sm">Ghost SM</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="primary" loading>Loading...</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="primary" size="lg" onClick={() => setClicked((value) => !value)}>
              {clicked ? "State Updated" : "Toggle State"}
            </Button>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-h3 font-display">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="glass" interactive><div className="p-4"><h3 className="text-h5">Glass Card</h3><p className="text-neutral-400">Interactive</p></div></Card>
            <Card variant="metal"><div className="p-4"><h3 className="text-h5">Metal Card</h3></div></Card>
            <Card variant="outlined"><div className="p-4"><h3 className="text-h5">Outlined Card</h3></div></Card>
          </div>
        </section>

        {/* Inputs & Forms */}
        <section className="space-y-6">
          <h2 className="text-h3 font-display">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="emerald" dot>Operational</Badge>
            <Badge variant="violet">AI Ready</Badge>
            <Badge variant="success">Healthy</Badge>
          </div>
        </section>
      </div>
    </GridBackground>
  );
}
