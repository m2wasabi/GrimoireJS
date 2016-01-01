import ContextComponents = require("../../../ContextComponents");
import MaterialManager = require("../../../Core/Materials/Base/MaterialManager");
import JThreeContext = require("../../../JThreeContext");
import Phong = require("../../../Core/Materials/Forward/PhongMaterial");
﻿import BasicMaterial = require("../../../Core/Materials/Base/BasicMaterial");
import GomlTreeNodeBase = require("../../GomlTreeNodeBase");
import MaterialNodeBase = require('./MaterialNodeBase');
import Material = require('../../../Core/Materials/Material')
import TextureNode = require("../Texture/TextureNode")
class PhongNode extends MaterialNodeBase {
  public material: Phong;

  constructor() {
    super();
    // this.attributes.defineAttribute({
    //   "diffuse": {
    //     value: "#f0C",
    //     converter: "color4",
    //     onchanged: (attr) => {
    //       this.material.diffuse = attr.Value;
    //     },
    //   },
    //   "ambient": {
    //     value: "#222",
    //     converter: "color4",
    //     onchanged: (attr) => {
    //       this.material.ambient = attr.Value;
    //     },
    //   },
    //   "specular": {
    //     value: "#CCC",
    //     converter: "color3",
    //     onchanged: (attr) => {
    //       this.material.specular = attr.Value;
    //     },
    //   },
    //   "specularpower": {
    //     value: 10,
    //     converter: "number",
    //     onchanged: (attr) => {
    //       this.material.specularCoefficient = attr.Value;
    //     },
    //   },
    //   "texture": {
    //     value: null,
    //     converter: "string",
    //     onchanged: this._onTextureAttrChanged,
    //   }
    // });
  }

  private _onTextureAttrChanged(attr): void {
    if (attr.Value) {
      this.nodeManager.nodeRegister.getObject("jthree.resource.texture2d", attr.Value, (node: TextureNode) => {
        this.material.materialVariables["texture"] = node.TargetTexture;
      });
    }
  }

  protected ConstructMaterial(): Material {
    this.material = JThreeContext.getContextComponent<MaterialManager>(ContextComponents.MaterialManager).constructMaterial("jthree.basic.phong");
    return this.material;
  }

  protected nodeWillMount(parent: GomlTreeNodeBase): void {
    super.nodeWillMount(parent);
  }

}

export = PhongNode;
