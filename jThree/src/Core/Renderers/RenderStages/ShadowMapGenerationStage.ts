import RendererBase = require('../RendererBase');
import SceneObject = require('../../SceneObject');
import RenderStageBase = require('./RenderStageBase');
import ClearTargetType = require("../../../Wrapper/ClearTargetType");
import Scene = require('../../Scene');
import ResolvedChainInfo = require('../ResolvedChainInfo');
import Program = require("../../Resources/Program/Program");
import JThreeContext = require("../../JThreeContextProxy")
import Matrix = require("../../../Math/Matrix");
import CubeTexture = require("../../Resources/Texture/CubeTexture");
class ShadowMapGenerationStage extends RenderStageBase
{
    constructor(renderer: RendererBase)
    {
        super(renderer);
    }

    private getShadowDroppableLight(scene:Scene,techniqueIndex:number)
    {
      return scene.LightRegister.shadowDroppableLights[techniqueIndex];
    }

    public preAllStage(scene:Scene,chainInfo:ResolvedChainInfo)
    {
      this.bindAsOutBuffer(
        this.DefaultFBO,
        [
          {
            texture: scene.LightRegister.shadowMapResourceManager.shadowMapTileTexture,
            target: 0
          }, {
              texture: scene.LightRegister.shadowMapResourceManager.shadowMapRenderBuffer,
              type: "rbo",
              target: "depth"
            }
        ],()=>{
          this.Renderer.GLContext.ClearColor(0, 0, 0, 0);
          this.Renderer.GLContext.Clear(ClearTargetType.ColorBits|ClearTargetType.DepthBits);
        },()=>{}
      );
    }

    public postAllStage(scene:Scene,chainInfo:ResolvedChainInfo)
    {
      this.Renderer.applyViewportConfigure();
    }


    public preBeginStage(scene: Scene, techniqueCount: number, chainInfo: ResolvedChainInfo) {
    }

    public render(scene: Scene, object: SceneObject, techniqueCount: number,texs) {
        var geometry = object.Geometry;
        var targetLight = this.getShadowDroppableLight(scene,techniqueCount);
        scene.LightRegister.shadowMapResourceManager.setShadowMapViewport(this.Renderer,techniqueCount);
        this.drawForMaterials(scene,object,techniqueCount,texs,"jthree.materials.shadowmap");
    }


    public needRender(scene: Scene, object: SceneObject, techniqueCount: number): boolean {
        return true;
    }

    public getTechniqueCount(scene: Scene)
    {
        return scene.LightRegister.ShadowDroppableLightCount;
    }

    public get TargetGeometry(): string
    {
        return "scene";
    }

    public get RenderStageConfig()
    {
        return {
            depthTest: true,
            cullFace: false,
            blend:false
        };
    }
}
export = ShadowMapGenerationStage;
