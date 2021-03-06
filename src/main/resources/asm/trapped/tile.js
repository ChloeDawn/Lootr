function initializeCoreMod() {
    return {
        'createNewTileEntity': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.block.TrappedChestBlock',
                'methodName': 'func_196283_a_',
                'methodDesc': '(Lnet/minecraft/world/IBlockReader;)Lnet/minecraft/tileentity/TileEntity;'
            },
            'transformer': function (method) {
                print("[LootR] Patching TrappedChestBlock::createNewTileEntity");

                var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var InsnList = Java.type('org.objectweb.asm.tree.InsnList');
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                var TypeInsnNode = Java.type('org.objectweb.asm.tree.TypeInsnNode');

                var instr = method.instructions;
                var insn = new InsnList();
                insn.add(new TypeInsnNode(Opcodes.NEW, "noobanidus/mods/lootr/tiles/SpecialTrappedLootChestTile"));
                insn.add(new InsnNode(Opcodes.DUP));
                insn.add(ASMAPI.buildMethodCall("noobanidus/mods/lootr/tiles/SpecialTrappedLootChestTile", "<init>", "()V", ASMAPI.MethodType.SPECIAL));
                insn.add(new InsnNode(Opcodes.ARETURN));
                instr.insert(insn);

                return method;
            }
        }
    }
}