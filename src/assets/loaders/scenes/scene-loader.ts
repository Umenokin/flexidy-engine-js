import type { SceneAsset } from 'flexidy-engine/assets/scenes/scene-asset';
import { CVector3 } from 'flexidy-engine/math/vector3';
import { Scene } from '../../../scenes/scene';
import { Loader, SharedResources } from '../loader';

export class SceneLoader extends Loader<SceneAsset, Scene> {
  public deserialize({ params }: SceneAsset, resources: SharedResources): Scene {
    const { uuid, name, position, components, children } = params;
    const scene = new Scene(uuid, name);
    scene.setPosition(position as CVector3);

    components
      .filter((comp) => comp.type === 'meshes.embedded')
      .forEach((comp) => scene.addComponent(Loader.deserialize(comp, resources)));

    children.forEach((child) => scene.addChild(Loader.deserialize(child, resources)));

    return scene;
  }
}
