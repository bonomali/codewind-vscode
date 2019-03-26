/*******************************************************************************
 * Copyright (c) 2018, 2019 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

import { Uri } from "vscode";
import Connection from "../microclimate/connection/Connection";

// non-nls-file

/**
 * Class to hold constants that are Portal API endpoint paths
 */
export default class Endpoints {

    // "regular" endpoints, eg "localhost:9090/api/v1/environment"
    public static readonly ENVIRONMENT: string = "api/v1/environment";
    public static readonly PROJECTS: string = "api/v1/projects";
    public static readonly PROJECTS_V2: string = "api/v2/projects";
    // Deprecated
    public static readonly VALIDATE_OLD: string = "api/v1/validate";
    // Deprecated
    public static readonly GENERATE_OLD: string = "api/v1/validate/generate";

    public static getEndpoint(connection: Connection, endpoint: string): string {
        return connection.mcUri.toString().concat(endpoint);
    }

    // Project endpoints, eg "localhost:9090/api/v1/project/81eba580-0aea-11e9-b530-67b2995d0cd9/restart"
    public static readonly RESTART_ACTION:  string = "restart";
    public static readonly BUILD_ACTION:    string = "build";
    public static readonly BUILD_LOG:       string = "build-log";
    public static readonly VALIDATE:        string = "validate";
    public static readonly GENERATE:        string = "validate/generate";
    public static readonly PROPERTES:       string = "properties";

    public static getProjectEndpoint(connection: Connection, projectID: string, endpoint: string, useV2: boolean = false): string {
        return connection.mcUri.toString().concat(`${useV2 ? Endpoints.PROJECTS_V2 : Endpoints.PROJECTS}/${projectID}/${endpoint}`);
    }

    public static getAppMonitorUrl(connection: Connection, projectID: string): Uri {
        return connection.mcUri.with({ query: `project=${projectID}&view=monitor` });
    }

    private static readonly QUERY_NEW_PROJECT:      string = "new-project=true";
    private static readonly QUERY_IMPORT_PROJECT:   string = "import-project=true";

    public static getCreateOrImportUrl(connection: Connection, create: boolean): Uri {
        const query = create ? this.QUERY_NEW_PROJECT : this.QUERY_IMPORT_PROJECT;
        return connection.mcUri.with({ query });
    }

    public static getEnablementAction(enable: boolean): string {
        return `${enable ? "open" : "close"}`;
    }
}
