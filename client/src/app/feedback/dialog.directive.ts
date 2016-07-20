import { Directive, ComponentResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component.ts';

@Directive({ selector: '[dialogAnchor]' })

export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentResolver: ComponentResolver
    ) {}

    createDialog(dialogComponent: { new(): DialogComponent }):Promise<ComponentRef<DialogComponent>> {
        this.viewContainer.clear();

        let componentCreated = this.componentResolver
            .resolveComponent(dialogComponent)
            .then((dialogComponentFactory: ComponentFactory<DialogComponent>) => {
                return this.viewContainer.createComponent(dialogComponentFactory);
            });

        componentCreated.then((dialogComponentRef: ComponentRef<DialogComponent>) => {
            dialogComponentRef.instance.close.subscribe(() => {
                dialogComponentRef.destroy();
            });
        });

        return componentCreated;
    }
}