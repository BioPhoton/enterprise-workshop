import { Rule } from '@angular-devkit/schematics';
import { Options } from 'prettier';
export declare function addUpgradeToPackageJson(): Rule;
export declare function offsetFromRoot(fullPathToSourceDir: string): string;
export declare const DEFAULT_NRWL_PRETTIER_CONFIG: {
    singleQuote: boolean;
};
export interface ExistingPrettierConfig {
    sourceFilepath: string;
    config: Options;
}
export declare function resolveUserExistingPrettierConfig(): Promise<ExistingPrettierConfig | null>;
