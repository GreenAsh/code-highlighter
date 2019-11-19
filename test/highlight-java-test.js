const PRISM = require('../prism.js');
const { highlightCode } = require('../code-highlighter.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``);
const document = dom.window.document;

console.log(highlightCode(`package projects.pt.server.platform.application.models.platformpartner;

import platform.server.core.general.spaces.model.ServerOnlyNotTypedModel;
import platform.server.core.general.spaces.model.annotation.PersistentData;
import platform.server.core.general.transaction.TransactionEnterPoint;
import platform.server.core.space.annotations.models.ModelInfo;

@ModelInfo(value = "PlatformPartner", serverOnly = true)
public class PlatformPartnerModel extends ServerOnlyNotTypedModel implements IPlatformPartner {

    @PersistentData
    private PlatformPartnerEntity entity;

    @Override
    public boolean isPartner() {
        return entity.isPartner();
    }

    @TransactionEnterPoint
    @Override
    public void setPartner(boolean partner) {
        change(entity).setPartner(partner);
    }
}`, document, 'java'));

