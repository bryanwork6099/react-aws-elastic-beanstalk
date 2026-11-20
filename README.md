# Deploying a React Application on AWS Elastic Beanstalk

A hands-on cloud deployment project demonstrating how to build a React web application, integrate it with a Node.js and Express.js server, and deploy it to AWS Elastic Beanstalk.

**Author:** Bryan Lim

---

## 1. Project Overview

This project demonstrates the end-to-end deployment of a React-based web application using AWS Elastic Beanstalk.

The React frontend is built into production-ready static files and served through an Express.js web server running on Node.js. AWS Elastic Beanstalk manages the application deployment and hosting on an Amazon EC2 instance.

The application features a responsive webpage displaying the technologies used and deployment information.

### Project Objectives

- Create and customize a React web application.
- Integrate Express.js as the application server.
- Configure Node.js to serve React production files.
- Build and package the application for deployment.
- Deploy the application using AWS Elastic Beanstalk.
- Verify application availability through the Elastic Beanstalk environment URL.

## 2. Technologies and AWS Services

| Technology / Service | Purpose |
|---|---|
| React.js | Frontend user interface |
| Node.js | JavaScript runtime environment |
| Express.js | Web server for serving React production files |
| npm | Dependency management and application scripts |
| AWS Elastic Beanstalk | Application deployment and environment management |
| Amazon EC2 | Compute infrastructure hosting the application |
| Amazon S3 | Stores Elastic Beanstalk application versions and deployment bundles |
| AWS IAM | Manages permissions for Elastic Beanstalk and EC2 |

### Architecture

```text
                 User / Web Browser
                         |
                         |
                  HTTP Application URL
                         |
                         v
              AWS Elastic Beanstalk
                         |
                         v
                   Amazon EC2
                         |
                         v
                  Node.js Server
                    (Express.js)
                         |
                         v
                 React Production
                    Build Files
                         |
                         v
                  Rendered Webpage
```

**Deployment configuration:**
- AWS Region: Asia Pacific (Singapore) - ap-southeast-1
- Environment tier: Web server environment
- Platform: Node.js on Amazon Linux 2023
- Environment type: Single instance
- Compute: One Amazon EC2 instance
- Load balancer: Not configured
- Database: Not configured

## 3. Prerequisites

Before starting, ensure the following tools and access are available:

| Requirement | Description |
|---|---|
| Node.js | JavaScript runtime |
| npm | Node.js package manager |
| Visual Studio Code | Code editor |
| PowerShell | Command-line interface |
| AWS Account | Access to AWS Management Console |
| AWS IAM Permissions | Permissions to create and manage Elastic Beanstalk resources |

Verify Node.js and npm:

```powershell
node --version
npm.cmd --version
```

**Note:** On Windows PowerShell, `npm` may be blocked by the PowerShell execution policy because it invokes `npm.ps1`. Using `npm.cmd` and `npx.cmd` avoids the need to modify the execution policy.

## 4. Create the React Application

### Step 1: Create the project directory

Open PowerShell and navigate to your preferred working directory.

```powershell
cd C:\Users\INNOVATUS-BRYAN\Documents
```

### Step 2: Create a React application

Execute:

```powershell
npx.cmd create-react-app@latest react-eb-app
```

If prompted to continue with the installation, enter:

```text
y
```

Wait for the installation to complete.

### Step 3: Navigate into the project directory

```powershell
cd react-eb-app
```

### Step 4: Start the development server

```powershell
npm.cmd start
```

Open the following address in your browser:

```text
http://localhost:3000
```

The default Create React App webpage should appear.

## 5. Customize the React Application

The application frontend was customized to provide a modern, responsive cloud deployment landing page.

### Step 1: Update App.js

Open:

```text
src/App.js
```

Replace the default React component with the customized application interface.

The webpage contains:

- Navigation bar with application status.
- Welcome section introducing the cloud application.
- Technology stack cards.
- AWS deployment information.
- Footer displaying the project author, Bryan Lim.

### Step 2: Update App.css

Open:

```text
src/App.css
```

Customize the webpage styling, including:

- Dark navy background.
- Blue and purple accent colors.
- Responsive layout.
- Technology cards.
- Deployment information section.
- Hover effects and visual styling.

### Step 3: Update index.css

Open:

```text
src/index.css
```

Configure the global styling, including:

- CSS reset.
- Box-sizing.
- Font family.
- Smooth scrolling.
- Global background and text colors.

Save all changes.

## 6. Configure Node.js and Express.js

AWS Elastic Beanstalk uses Node.js to run the application.

Express.js is used to serve the React production build files.

### Step 1: Install Express.js

From the project root directory, execute:

```powershell
npm.cmd install express
```

### Step 2: Create server.js

Create a new file named:

```text
server.js
```

Add the following code:

```javascript
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve React production files
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
```

**Explanation:**

- `express()` initializes the Express application.
- `express.static()` serves the React production files from the `build` directory.
- `app.use()` handles other requests by returning the React application's `index.html`.
- `process.env.PORT` allows Elastic Beanstalk to supply the application port.
- `0.0.0.0` allows the server to accept connections through the instance network interface.

### Step 3: Update package.json

Open:

```text
package.json
```

Update the scripts section:

```json
"scripts": {
  "start": "node server.js",
  "start:dev": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

The `start` script runs the Express production server, while `start:dev` starts the React development server.

### Step 4: Test the application locally

Start the React development server:

```powershell
npm.cmd run start:dev
```

Open:

```text
http://localhost:3000
```

Stop the development server using `Ctrl + C`.

Next, generate the production build:

```powershell
npm.cmd run build
```

Start the Express server:

```powershell
npm.cmd start
```

Open:

```text
http://localhost:8080
```

Confirm that the React application loads successfully.

## 7. Prepare the Application Deployment Package

Elastic Beanstalk requires a source bundle containing the application files.

### Step 1: Stop the local server

Press:

```text
Ctrl + C
```

### Step 2: Generate the production build

```powershell
npm.cmd run build
```

This creates the React production files inside the `build` directory.

### Step 3: Create the ZIP package

From the project root directory, execute:

```powershell
tar.exe -a -c -f react-eb-app-v1.zip build server.js package.json package-lock.json
```

This creates the ZIP deployment package.

### Step 4: Verify the ZIP structure

```powershell
tar.exe -tf react-eb-app-v1.zip
```

Expected structure:

```text
build/
build/asset-manifest.json
build/index.html
build/static/
build/static/css/
build/static/js/
server.js
package.json
package-lock.json
```

**Important:**

- The ZIP archive must contain the `build` directory at its root.
- `server.js` must be at the root.
- `package.json` and `package-lock.json` must be at the root.
- Do not include `node_modules`.
- Archive paths must use forward slashes (`/`).

The `tar.exe` command was used to create the final deployment package with compatible ZIP paths.

## 8. Configure AWS Elastic Beanstalk

### Step 1: Open AWS Elastic Beanstalk

1. Sign in to the AWS Management Console.
2. Search for **Elastic Beanstalk**.
3. Select the Singapore Region (`ap-southeast-1`).
4. Click **Create application**.

### Step 2: Configure the application

| Setting | Configuration |
|---|---|
| Application name | react-eb-app |
| Environment tier | Web server environment |
| Environment name | react-eb-app-env |
| Domain | Default generated domain |

### Step 3: Configure the platform

| Setting | Configuration |
|---|---|
| Platform | Managed platform |
| Platform | Node.js |
| Platform branch | Node.js 26 running on 64bit Amazon Linux 2023 |
| Platform version | Latest recommended version |

### Step 4: Upload the application

Under Application Code:

| Setting | Configuration |
|---|---|
| Application code | Upload your code |
| Source code origin | Local file |
| Local file | react-eb-app-v1.zip |
| Version label | react-eb-app-v1 |

### Step 5: Configure the environment preset

Select:

```text
Single instance (free tier eligible)
```

This configuration avoids creating a load balancer and is suitable for a small development project.

Actual costs and free-tier eligibility depend on your AWS account, instance type, and current pricing.

## 9. Configure IAM Roles

Elastic Beanstalk requires IAM roles to manage the environment and provide permissions to the EC2 instance.

Two roles are required.

### A. Elastic Beanstalk Service Role

The service role allows Elastic Beanstalk to manage and monitor the environment.

Create or select an appropriate service role.

The standard managed policies used for this role include:

- `AWSElasticBeanstalkEnhancedHealth`
- `AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy`

Example role name:

```text
aws-elasticbeanstalk-service-role
```

### B. EC2 Instance Profile

The EC2 instance profile provides permissions to the EC2 instance running the application.

Create or select an appropriate Elastic Beanstalk EC2 role.

The standard managed policies used in the guided role setup include:

- `AWSElasticBeanstalkWebTier`
- `AWSElasticBeanstalkWorkerTier`
- `AWSElasticBeanstalkMulticontainerDocker`

Example role name:

```text
aws-elasticbeanstalk-ec2-role
```

Select the appropriate service role and EC2 instance profile in the Elastic Beanstalk configuration.

**Security note:** Use least-privilege permissions where practical. This project is a web server environment and does not require worker-tier or multicontainer Docker functionality.

## 10. Configure Networking and Instance Capacity

### Networking

Use the following configuration:

| Setting | Configuration |
|---|---|
| VPC | Default VPC |
| Public IP address | Enabled, if required |
| Instance subnet | Suitable public subnet |
| Database | Not configured |

The EC2 instance needs network connectivity to receive application traffic and retrieve required dependencies during deployment.

### Instance Capacity

| Setting | Configuration |
|---|---|
| Environment type | Single instance |
| Minimum instances | 1 |
| Maximum instances | 1 |
| Instance type | Smallest suitable available instance |
| Load balancer | None |

### Additional Configuration

- Health reporting: Enhanced, if available.
- CloudWatch Logs streaming: Disabled initially.
- EC2 key pair: Not required for this project.
- Database: Not required.

Review the configuration and create the environment.

## 11. Deploy the Application

After submitting the configuration, AWS Elastic Beanstalk provisions the environment.

The deployment process includes:

1. Creating the Elastic Beanstalk environment.
2. Provisioning the EC2 instance.
3. Downloading the application source bundle from the Elastic Beanstalk S3 bucket.
4. Extracting the application files.
5. Installing the Node.js dependencies.
6. Starting the application using the `npm start` command.
7. Performing environment health checks.

Wait until the environment health reports:

```text
Green / Ok
```

### Verify the Application

1. Open Elastic Beanstalk.
2. Select `react-eb-app`.
3. Open `react-eb-app-env`.
4. Locate the environment URL.
5. Open the URL in your browser.

Confirm that the enhanced React webpage loads successfully.

## 12. Redeploy an Updated Application Version

If the webpage or application code is updated, generate a new production build and deployment package.

### Step 1: Build the updated React application

```powershell
npm.cmd run build
```

### Step 2: Create a new ZIP package

```powershell
tar.exe -a -c -f react-eb-app-v2.zip build server.js package.json package-lock.json
```

### Step 3: Verify the package

```powershell
tar.exe -tf react-eb-app-v2.zip
```

### Step 4: Upload and deploy

1. Open the Elastic Beanstalk environment.
2. Click **Upload and deploy**.
3. Select `react-eb-app-v2.zip`.
4. Enter a new version label:

```text
react-eb-app-v2
```

5. Click **Deploy**.

Use a different version label for every new deployment.

## 13. Troubleshooting

### Issue 1: npm is not recognized or PowerShell blocks npm.ps1

**Cause:** PowerShell may block the npm PowerShell script due to its execution policy.

**Solution:**

Use:

```powershell
npm.cmd --version
npx.cmd create-react-app@latest react-eb-app
```

There is no need to change the PowerShell execution policy for this workflow.

### Issue 2: Cannot find the project directory

**Cause:** PowerShell is currently in a different directory.

**Solution:**

Navigate using the full project path:

```powershell
cd C:\Users\INNOVATUS-BRYAN\Documents\react-eb-app
```

### Issue 3: Express.js wildcard route error

**Cause:** Express 5 changed route-pattern handling, so older wildcard route examples may fail.

**Solution:**

Use:

```javascript
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

### Issue 4: Elastic Beanstalk deployment fails during ZIP extraction

**Error observed:**

```text
appears to use backslashes as path separators

StageApplication failed with error exit status 1
```

**Cause:** The ZIP source bundle contained Windows-style backslash path separators.

**Solution:**

Create the ZIP using:

```powershell
tar.exe -a -c -f react-eb-app-v2.zip build server.js package.json package-lock.json
```

Verify the archive using:

```powershell
tar.exe -tf react-eb-app-v2.zip
```

Ensure the paths use forward slashes.

### Issue 5: Application deployment fails after extraction

**Possible causes:**

- Missing `package.json`.
- Missing `server.js`.
- Incorrect `start` script.
- Missing dependencies.
- Application server startup failure.

**Troubleshooting:**

1. Open the Elastic Beanstalk environment.
2. Select **Logs**.
3. Request the last 100 lines or full logs.
4. Review `eb-engine.log` and application logs.
5. Check the npm installation and application startup errors.

## 14. AWS Resource Cleanup

After completing the project and testing the application, terminate the Elastic Beanstalk environment to avoid ongoing infrastructure charges.

### Step 1: Terminate the environment

1. Open Elastic Beanstalk.
2. Select `react-eb-app-env`.
3. Choose **Actions**.
4. Select **Terminate environment**.
5. Confirm termination.

### Step 2: Verify resource cleanup

Check the following AWS services:

| AWS Service | Cleanup |
|---|---|
| Elastic Beanstalk | Terminate the environment |
| Amazon EC2 | Verify the associated EC2 instance is terminated |
| Elastic Load Balancing | Verify no load balancer remains |
| Amazon S3 | Review and remove unused application bundles if no longer needed |
| Amazon CloudWatch | Review and remove unnecessary log groups |
| AWS IAM | Review project-specific roles and remove only those no longer required |

**Important:** Do not delete shared IAM roles, S3 buckets, or other resources that are still being used by another application or environment.

The local project files remain on your computer even after terminating the AWS environment.

To deploy the application again, repeat the Elastic Beanstalk environment setup and upload a valid application ZIP package.

## 15. Final Project Outcome

Successfully developed and deployed a responsive React web application on AWS Elastic Beanstalk using Node.js and Express.js.

The project demonstrates practical experience with:

- React application development.
- Node.js and Express.js integration.
- Production build generation and packaging.
- AWS Elastic Beanstalk environment configuration.
- IAM roles and instance profiles.
- Amazon EC2-based application hosting.
- Application deployment and version management.
- Deployment troubleshooting and AWS resource cleanup.

---

## Author

**Bryan Lim**

Network and Systems Engineer | Cloud & Infrastructure Projects

**Project:** Deploying a React Application on AWS Elastic Beanstalk
