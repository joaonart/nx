import { Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@nrwl/workspace';

export default function update(): Rule {
  return updateWorkspaceInTree(workspaceJson => {
    Object.entries<any>(workspaceJson.projects).forEach(
      ([projectName, project]) => {
        Object.entries<any>(project.architect).forEach(
          ([targetName, targetConfig]) => {
            if (targetConfig.builder === '@nrwl/web:build') {
              const architect =
                workspaceJson.projects[projectName].architect[targetName];
              if (architect && architect.options) {
                architect.options.buildLibsFromSource = true;
              }
            }
          }
        );
      }
    );
    return workspaceJson;
  });
}
